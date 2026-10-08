/**
 * @financas/core - Motor de Previsão de Fluxo de Caixa a 30 Dias (Cash Flow Forecast Engine)
 * Projeta saldos dia a dia, identifica riscos de descoberto bancário e sugere transferências preventivas.
 */

import {
  Account,
  RecurringTransaction,
  Transaction,
  CashFlowRiskAlert,
  CashFlowDailyPoint,
  CashFlowForecastReport,
  CashFlowRiskSeverity,
} from './types';

export class CashFlowForecastEngine {
  /**
   * Verifica se a regra recorrente coincide com uma data específica
   */
  static matchesRecurrence(
    rule: RecurringTransaction,
    targetDate: Date,
    startDate: Date
  ): boolean {
    if (!rule.isActive) return false;
    const ruleStart = new Date(rule.nextDueDate);
    if (targetDate < ruleStart) return false;

    switch (rule.frequency) {
      case 'daily':
        return true;
      case 'weekly':
        return targetDate.getDay() === ruleStart.getDay();
      case 'monthly':
        return targetDate.getDate() === ruleStart.getDate();
      case 'yearly':
        return (
          targetDate.getMonth() === ruleStart.getMonth() &&
          targetDate.getDate() === ruleStart.getDate()
        );
      default:
        return false;
    }
  }

  /**
   * Gera a projeção diária de fluxo de caixa e alertas de liquidez
   */
  static generateForecast(
    accounts: Account[],
    recurringTransactions: RecurringTransaction[],
    futureTransactions: Transaction[] = [],
    creditCardDebts: { dueDay: number; debt: number; cardName: string }[] = [],
    daysAhead: number = 30,
    referenceDateStr: string = '2026-05-19'
  ): CashFlowForecastReport {
    const refDate = new Date(referenceDateStr);
    const msInDay = 1000 * 60 * 60 * 24;

    // Contas líquidas operacionais (exclui cartão de crédito)
    const liquidAccounts = accounts.filter(
      (a) => a.type !== 'Cartão de Crédito'
    );

    // Saldo atual de trabalho por conta
    const accountBalances = new Map<string, number>();
    for (const acc of liquidAccounts) {
      accountBalances.set(acc.id, acc.currentBalance ?? acc.initialBalance ?? 0);
    }

    const detectedAlerts: CashFlowRiskAlert[] = [];
    const dailyPoints: CashFlowDailyPoint[] = [];

    let lowestBalance = Array.from(accountBalances.values()).reduce(
      (sum, val) => sum + val,
      0
    );
    let lowestDate = referenceDateStr;

    // Projeta dia por dia
    for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
      const curDate = new Date(refDate.getTime() + dayOffset * msInDay);
      const curDateStr = curDate.toISOString().split('T')[0];

      let dayIncomes = 0;
      let dayExpenses = 0;

      // 1. Transações futuras agendadas
      const dayScheduled = futureTransactions.filter(
        (tx) => tx.date === curDateStr
      );
      for (const tx of dayScheduled) {
        if (accountBalances.has(tx.accountId)) {
          if (tx.type === 'income') {
            accountBalances.set(
              tx.accountId,
              accountBalances.get(tx.accountId)! + tx.amount
            );
            dayIncomes += tx.amount;
          } else {
            accountBalances.set(
              tx.accountId,
              accountBalances.get(tx.accountId)! - tx.amount
            );
            dayExpenses += tx.amount;
          }
        }
      }

      // 2. Regras Recorrentes Ativas
      for (const rule of recurringTransactions) {
        if (this.matchesRecurrence(rule, curDate, refDate)) {
          if (accountBalances.has(rule.accountId)) {
            if (rule.type === 'income') {
              accountBalances.set(
                rule.accountId,
                accountBalances.get(rule.accountId)! + rule.amount
              );
              dayIncomes += rule.amount;
            } else {
              accountBalances.set(
                rule.accountId,
                accountBalances.get(rule.accountId)! - rule.amount
              );
              dayExpenses += rule.amount;
            }
          }
        }
      }

      // 3. Faturas de Cartão com vencimento no dia
      const dayOfMonth = curDate.getDate();
      for (const card of creditCardDebts) {
        if (card.dueDay === dayOfMonth && card.debt > 0) {
          // Debita da conta primária líquida
          const primaryAcc = liquidAccounts[0];
          if (primaryAcc && accountBalances.has(primaryAcc.id)) {
            accountBalances.set(
              primaryAcc.id,
              accountBalances.get(primaryAcc.id)! - card.debt
            );
            dayExpenses += card.debt;
          }
        }
      }

      // Saldo consolidado total no dia
      const totalLiquidToday = Array.from(accountBalances.values()).reduce(
        (sum, v) => sum + v,
        0
      );

      if (totalLiquidToday < lowestBalance) {
        lowestBalance = totalLiquidToday;
        lowestDate = curDateStr;
      }

      dailyPoints.push({
        date: curDateStr,
        balance: Math.round(totalLiquidToday * 100) / 100,
        scheduledIncomes: Math.round(dayIncomes * 100) / 100,
        scheduledExpenses: Math.round(dayExpenses * 100) / 100,
        isNegative: totalLiquidToday < 0,
      });

      // Checa se alguma conta ficou negativa
      for (const acc of liquidAccounts) {
        const bal = accountBalances.get(acc.id) ?? 0;
        if (bal < 0) {
          const already = detectedAlerts.some((a) => a.accountId === acc.id);
          if (!already) {
            const deficit = Math.abs(bal);

            // Procura conta de resgate com saldo disponível
            const candidateRescues = liquidAccounts.filter(
              (a) =>
                a.id !== acc.id && (accountBalances.get(a.id) ?? 0) > deficit
            );
            const bestRescue = candidateRescues.sort(
              (a, b) =>
                (accountBalances.get(b.id) ?? 0) -
                (accountBalances.get(a.id) ?? 0)
            )[0];

            detectedAlerts.push({
              id: `alert-${acc.id}-${curDateStr}`,
              accountId: acc.id,
              accountName: acc.name,
              accountIcon: acc.iconName || 'landmark',
              predictedDate: curDateStr,
              projectedBalance: Math.round(bal * 100) / 100,
              projectedDeficit: Math.round(deficit * 100) / 100,
              severity: 'critical',
              causeDescription:
                'Despesas e compromissos agendados superam o saldo disponível da conta.',
              suggestedRescueAccountId: bestRescue?.id,
              suggestedRescueAccountName: bestRescue?.name,
              suggestedTransferAmount: Math.round((deficit + 50) * 100) / 100, // Margem preventiva de R$ 50
            });
          }
        }
      }
    }

    // Severidade Geral
    let overallSeverity: CashFlowRiskSeverity = 'healthy';
    let headlineAdvice = `Fluxo de caixa saudável e sem riscos de descoberto nos próximos ${daysAhead} dias.`;

    if (detectedAlerts.length > 0) {
      overallSeverity = 'critical';
      const count = detectedAlerts.length;
      headlineAdvice = `${count} conta${count > 1 ? 's têm' : ' tem'} risco de saldo negativo projetado nos próximos ${daysAhead} dias.`;
    } else if (lowestBalance < 200) {
      overallSeverity = 'warning';
      headlineAdvice = `Projeção de fluxo apertada: o saldo combinado atingirá um ponto baixo de reserva nos próximos dias.`;
    }

    return {
      daysProjected: daysAhead,
      alerts: detectedAlerts,
      overallSeverity,
      lowestProjectedBalance: Math.round(lowestBalance * 100) / 100,
      lowestBalanceDate: lowestDate,
      dailyPoints,
      headlineAdvice,
    };
  }
}
