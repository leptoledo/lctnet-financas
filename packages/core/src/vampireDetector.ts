/**
 * @financas/core - Motor de Detecção de Assinaturas Vampiro & Inflação Pessoal
 * Identifica drenos automáticos, aumentos silenciosos de preço (price creep) e evolução do custo de vida.
 */

import {
  Transaction,
  RecurringTransaction,
  VampireSubscription,
  VampireLeakReport,
  PriceHike,
  PersonalInflationRate,
  CategoryInflation,
  VampireHealthGrade,
} from './types';

export const KNOWN_SUBSCRIPTION_GUIDES: Record<string, string> = {
  netflix: 'https://www.netflix.com/youraccount',
  spotify: 'https://www.spotify.com/account',
  apple: 'https://support.apple.com/HT202039',
  icloud: 'https://support.apple.com/HT207594',
  amazon: 'https://www.amazon.com/mc/manage',
  prime: 'https://www.amazon.com/mc/manage',
  disney: 'https://www.disneyplus.com/account',
  hbo: 'https://auth.max.com',
  max: 'https://auth.max.com',
  youtube: 'https://www.youtube.com/paid_memberships',
  chatgpt: 'https://chatgpt.com/#settings',
  openai: 'https://chatgpt.com/#settings',
};

export class VampireDetectorEngine {
  /**
   * Encontra link de cancelamento direto baseado no nome
   */
  static matchCancellationUrl(name: string): string | undefined {
    const lower = name.toLowerCase();
    for (const [key, url] of Object.entries(KNOWN_SUBSCRIPTION_GUIDES)) {
      if (lower.includes(key)) {
        return url;
      }
    }
    return undefined;
  }

  /**
   * Detecta aumento silencioso de preço (Price Creep >= 3%)
   */
  static detectPriceHike(
    name: string,
    currentAmount: number,
    transactions: Transaction[]
  ): PriceHike | undefined {
    const normName = name.trim().toLowerCase();
    const matching = transactions
      .filter(
        (tx) =>
          tx.type === 'expense' &&
          tx.name.trim().toLowerCase() === normName &&
          tx.amount > 0
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (matching.length < 2) return undefined;

    const latest = currentAmount;
    for (let i = 1; i < matching.length; i++) {
      const older = matching[i];
      if (older.amount < latest && older.amount > 0) {
        const diff = latest - older.amount;
        const pct = (diff / older.amount) * 100;
        if (pct >= 3.0) {
          return {
            previousAmount: older.amount,
            currentAmount: latest,
            percentIncrease: Math.round(pct * 10) / 10,
          };
        }
      }
    }

    return undefined;
  }

  /**
   * Detecta assinaturas não cadastradas explicitamente através de recorrência nos lançamentos
   */
  static detectImplicitSubscriptions(
    transactions: Transaction[],
    excludingNames: Set<string>
  ): VampireSubscription[] {
    const expenseTxs = transactions.filter(
      (tx) => tx.type === 'expense' && tx.amount > 0
    );

    const groupedByName = new Map<string, Transaction[]>();
    for (const tx of expenseTxs) {
      const norm = tx.name.trim().toLowerCase();
      if (!norm || excludingNames.has(norm)) continue;
      if (!groupedByName.has(norm)) {
        groupedByName.set(norm, []);
      }
      groupedByName.get(norm)!.push(tx);
    }

    const detected: VampireSubscription[] = [];

    for (const [, txs] of groupedByName.entries()) {
      if (txs.length < 2) continue;

      const sorted = [...txs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const latestAmount = sorted[0].amount;

      // Verifica consistência de valor (variação < R$ 1 ou < 5%)
      const sameAmountCount = sorted.filter(
        (t) => Math.abs(t.amount - latestAmount) <= 1.5
      ).length;
      if (sameAmountCount / sorted.length < 0.7) continue;

      // Intervalos em dias
      const intervals: number[] = [];
      for (let i = 0; i < sorted.length - 1; i++) {
        const d1 = new Date(sorted[i].date).getTime();
        const d2 = new Date(sorted[i + 1].date).getTime();
        const diffDays = Math.round(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24));
        intervals.push(diffDays);
      }

      if (intervals.length === 0) continue;
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

      // Se o intervalo médio for entre 24 e 35 dias, é padrão mensal de assinatura
      if (avgInterval >= 24 && avgInterval <= 35) {
        const monthlyCost = latestAmount;
        const annualCost = monthlyCost * 12;
        const hike = this.detectPriceHike(sorted[0].name, latestAmount, transactions);
        const cancelUrl = this.matchCancellationUrl(sorted[0].name);

        detected.push({
          id: `implicit-${sorted[0].name.toLowerCase().replace(/\s+/g, '-')}`,
          name: sorted[0].name,
          categoryName: sorted[0].category || 'Assinatura Oculta',
          monthlyCost,
          annualCost,
          frequencyLabel: 'Mensal (Detectado)',
          isRegisteredRecurrence: false,
          lastChargedDate: sorted[0].date,
          priceHike: hike,
          cancellationUrlString: cancelUrl,
        });
      }
    }

    return detected;
  }

  /**
   * Calcula Taxa de Inflação Pessoal comparando janela de 30 dias com janela anterior
   */
  static calculatePersonalInflation(
    transactions: Transaction[],
    referenceDateStr: string = '2026-05-19'
  ): PersonalInflationRate {
    const refDate = new Date(referenceDateStr);
    const msInDay = 1000 * 60 * 60 * 24;

    const currentPeriodStart = new Date(refDate.getTime() - 30 * msInDay);
    const previousPeriodStart = new Date(refDate.getTime() - 60 * msInDay);

    const expenses = transactions.filter(
      (tx) => tx.type === 'expense' && tx.amount > 0
    );

    const currentTxs = expenses.filter((tx) => {
      const d = new Date(tx.date);
      return d >= currentPeriodStart && d <= refDate;
    });

    const previousTxs = expenses.filter((tx) => {
      const d = new Date(tx.date);
      return d >= previousPeriodStart && d < currentPeriodStart;
    });

    const currentTotal = currentTxs.reduce((sum, tx) => sum + tx.amount, 0);
    const previousTotal = previousTxs.reduce((sum, tx) => sum + tx.amount, 0);

    const overallRate =
      previousTotal > 0
        ? ((currentTotal - previousTotal) / previousTotal) * 100
        : 0;

    // Agrupamento por categoria
    const currentByCat = new Map<string, number>();
    for (const tx of currentTxs) {
      const cat = tx.category || 'Outros';
      currentByCat.set(cat, (currentByCat.get(cat) || 0) + tx.amount);
    }

    const prevByCat = new Map<string, number>();
    for (const tx of previousTxs) {
      const cat = tx.category || 'Outros';
      prevByCat.set(cat, (prevByCat.get(cat) || 0) + tx.amount);
    }

    const allCats = new Set([...currentByCat.keys(), ...prevByCat.keys()]);
    const catInflations: CategoryInflation[] = [];
    let maxDelta = 0;
    let mainDriver: string | undefined = undefined;

    for (const cat of allCats) {
      const cur = currentByCat.get(cat) || 0;
      const prev = prevByCat.get(cat) || 0;
      if (cur === 0 && prev === 0) continue;

      const rate = prev > 0 ? ((cur - prev) / prev) * 100 : 100;
      const delta = cur - prev;
      if (delta > maxDelta) {
        maxDelta = delta;
        mainDriver = cat;
      }

      catInflations.push({
        categoryName: cat,
        currentMonthSpent: cur,
        previousMonthSpent: prev,
        ratePercent: Math.round(rate * 10) / 10,
      });
    }

    catInflations.sort((a, b) => Math.abs(b.ratePercent) - Math.abs(a.ratePercent));

    return {
      overallRatePercent: Math.round(overallRate * 10) / 10,
      categoryInflations: catInflations,
      currentPeriodTotal: currentTotal,
      previousPeriodTotal: previousTotal,
      mainDriverCategory: mainDriver,
    };
  }

  /**
   * Avaliação de nota de saúde financeira e conselho tático
   */
  static evaluateHealth(
    totalMonthlyDrain: number,
    subsCount: number,
    priceHikesCount: number,
    inflationRate: number
  ): { grade: VampireHealthGrade; summary: string } {
    if (subsCount === 0) {
      return {
        grade: 'A+',
        summary: 'Excelente! Nenhum dreno silencioso de assinatura detectado.',
      };
    }

    if (totalMonthlyDrain > 350 || priceHikesCount >= 2 || inflationRate > 15.0) {
      return {
        grade: 'D',
        summary:
          'Atenção Crítica: Suas assinaturas e inflação pessoal estão drenando uma quantia elevada do seu orçamento mensal.',
      };
    } else if (
      totalMonthlyDrain > 180 ||
      priceHikesCount >= 1 ||
      inflationRate > 8.0
    ) {
      return {
        grade: 'C',
        summary:
          'Alerta de Dreno: Existem assinaturas pesando no acumulado do ano e itens com reajuste silencioso de preço.',
      };
    } else if (totalMonthlyDrain > 80) {
      return {
        grade: 'B',
        summary:
          'Bom controle, mas vale a pena revisar periodicamente as assinaturas que você usa com pouca frequência.',
      };
    } else {
      return {
        grade: 'A',
        summary: 'Excelente controle de gastos fixos, assinaturas e serviços recorrentes!',
      };
    }
  }

  /**
   * Gera relatório completo de drenos, assinaturas, inflação e dias de vida
   */
  static analyze(
    transactions: Transaction[],
    recurringTransactions: RecurringTransaction[],
    monthlyIncome: number = 6000,
    weeklyWorkHours: number = 40,
    referenceDateStr: string = '2026-05-19'
  ): VampireLeakReport {
    const subs: VampireSubscription[] = [];
    const seenNames = new Set<string>();

    // 1. Assinaturas cadastradas
    for (const rec of recurringTransactions) {
      if (rec.type === 'expense' && rec.isActive) {
        const norm = rec.name.trim().toLowerCase();
        seenNames.add(norm);

        let monthlyCost: number;
        switch (rec.frequency) {
          case 'daily':
            monthlyCost = rec.amount * 30;
            break;
          case 'weekly':
            monthlyCost = rec.amount * 4.3333;
            break;
          case 'yearly':
            monthlyCost = rec.amount / 12;
            break;
          default:
            monthlyCost = rec.amount;
        }

        const annualCost = monthlyCost * 12;
        const hike = this.detectPriceHike(rec.name, rec.amount, transactions);
        const cancelUrl = this.matchCancellationUrl(rec.name);

        subs.push({
          id: rec.id,
          name: rec.name,
          categoryName: rec.category || 'Recorrente',
          monthlyCost: Math.round(monthlyCost * 100) / 100,
          annualCost: Math.round(annualCost * 100) / 100,
          frequencyLabel: rec.frequency === 'monthly' ? 'Mensal' : rec.frequency,
          isRegisteredRecurrence: true,
          priceHike: hike,
          cancellationUrlString: cancelUrl,
        });
      }
    }

    // 2. Assinaturas implícitas
    const implicit = this.detectImplicitSubscriptions(transactions, seenNames);
    subs.push(...implicit);

    // Ordenar do maior custo anual para o menor
    subs.sort((a, b) => b.annualCost - a.annualCost);

    // 3. Totais de dreno
    const totalMonthlyDrain = subs.reduce((acc, s) => acc + s.monthlyCost, 0);
    const totalAnnualDrain = subs.reduce((acc, s) => acc + s.annualCost, 0);

    // 4. Dias de trabalho drenados no ano
    const hourlyRate =
      monthlyIncome > 0 && weeklyWorkHours > 0
        ? monthlyIncome / (weeklyWorkHours * 4.3333)
        : 34.61;
    const annualHoursDrained = hourlyRate > 0 ? totalAnnualDrain / hourlyRate : 0;
    const annualWorkingDaysDrained =
      Math.round((annualHoursDrained / 8) * 10) / 10;

    // 5. Aumentos de preço
    const priceHikes = subs.filter((s) => s.priceHike !== undefined);

    // 6. Inflação pessoal
    const inflation = this.calculatePersonalInflation(
      transactions,
      referenceDateStr
    );

    // 7. Avaliação e Nota
    const { grade, summary } = this.evaluateHealth(
      totalMonthlyDrain,
      subs.count ?? subs.length,
      priceHikes.length,
      inflation.overallRatePercent
    );

    return {
      subscriptions: subs,
      totalMonthlyDrain: Math.round(totalMonthlyDrain * 100) / 100,
      totalAnnualDrain: Math.round(totalAnnualDrain * 100) / 100,
      annualWorkingDaysDrained,
      priceHikes,
      inflation,
      vampireHealthGrade: grade,
      adviceSummary: summary,
    };
  }
}
