import { Transaction, Budget, SpendingPaceReport, PaceStatus } from './types';

/**
 * Motor de Cálculo do Ritmo de Gastos (Spending Pace / Burn Rate)
 * Fiel a UtilitiesSpendingPaceHelper.swift
 */
export function calculateSpendingPace(
  transactions: Transaction[],
  budgets: Budget[],
  referenceDate: Date = new Date()
): SpendingPaceReport {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth(); // 0-indexed
  const currentDay = referenceDate.getDate();

  // Dias totais no mês atual
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysRemaining = Math.max(0, daysInMonth - currentDay);

  // Mês formatado YYYY-MM
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

  // Despesas do mês corrente até a data de referência
  const currentMonthExpenses = transactions.filter(t => {
    return t.type === 'expense' && t.date.startsWith(monthKey) && new Date(t.date).getDate() <= currentDay;
  });

  const spentSoFar = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

  // Teto orçamentário total do mês
  const currentMonthBudgets = budgets.filter(b => b.month === month + 1 && b.year === year);
  let totalBudgetLimit = currentMonthBudgets.reduce((sum, b) => sum + b.limit, 0);

  // Fallback: se o usuário ainda não tiver orçamentos cadastrados, usa um teto baseado na média ou despesas
  if (totalBudgetLimit <= 0) {
    totalBudgetLimit = Math.max(spentSoFar * 1.3, 3000);
  }

  // Cálculos de ritmo
  const idealDailyBurnRate = totalBudgetLimit / daysInMonth;
  const idealSpentSoFar = idealDailyBurnRate * currentDay;
  const dailyBurnRate = currentDay > 0 ? spentSoFar / currentDay : 0;
  const projectedMonthEnd = dailyBurnRate * daysInMonth;

  // Status de ritmo
  let paceStatus: PaceStatus = 'onTrack';
  let statusLabel = 'No Ritmo';

  if (projectedMonthEnd > totalBudgetLimit * 1.15) {
    paceStatus = 'overspending';
    statusLabel = 'Ritmo Acelerado';
  } else if (projectedMonthEnd > totalBudgetLimit * 0.98) {
    paceStatus = 'caution';
    statusLabel = 'Atenção';
  } else {
    paceStatus = 'onTrack';
    statusLabel = 'No Ritmo';
  }

  const percentageUsed = totalBudgetLimit > 0 ? (spentSoFar / totalBudgetLimit) * 100 : 0;
  const differenceToIdeal = spentSoFar - idealSpentSoFar;

  return {
    currentDay,
    daysInMonth,
    daysRemaining,
    spentSoFar,
    idealSpentSoFar,
    dailyBurnRate,
    idealDailyBurnRate,
    projectedMonthEnd,
    totalBudgetLimit,
    paceStatus,
    statusLabel,
    percentageUsed,
    differenceToIdeal
  };
}
