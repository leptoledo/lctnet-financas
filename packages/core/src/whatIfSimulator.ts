/**
 * @financas/core - Motor de Simulação Preditiva "Efeito Borboleta" (What-If Engine)
 * Analisa o impacto sistêmico de despesas pontuais ou recorrentes em juros compostos, metas e orçamento.
 */

import {
  SavingGoal,
  ButterflyImpactLevel,
  WhatIfGoalImpact,
  WhatIfOpportunityCost,
  WhatIfBudgetImpact,
  WhatIfAnalysisResult,
} from './types';
import { formatCurrency } from './formatters';

export class WhatIfEngine {
  /**
   * Calcula o custo de oportunidade investindo o valor a juros compostos
   */
  static calculateOpportunityCost(
    amount: number,
    isRecurring: boolean,
    annualRate: number = 8.0
  ): WhatIfOpportunityCost {
    const p = Math.max(0, amount);
    if (p <= 0) {
      return {
        oneYearValue: 0,
        fiveYearsValue: 0,
        tenYearsValue: 0,
        totalInterestTenYears: 0,
        annualRatePercent: annualRate,
      };
    }

    const r = annualRate / 100.0 / 12.0;

    const futureValue = (months: number): number => {
      if (isRecurring) {
        if (r <= 0) return p * months;
        return p * ((Math.pow(1.0 + r, months) - 1.0) / r);
      } else {
        return p * Math.pow(1.0 + r, months);
      }
    };

    const val1y = futureValue(12);
    const val5y = futureValue(60);
    const val10y = futureValue(120);

    const totalInvested10y = isRecurring ? p * 120 : p;
    const interest10y = Math.max(0, val10y - totalInvested10y);

    return {
      oneYearValue: Math.round(val1y * 100) / 100,
      fiveYearsValue: Math.round(val5y * 100) / 100,
      tenYearsValue: Math.round(val10y * 100) / 100,
      totalInterestTenYears: Math.round(interest10y * 100) / 100,
      annualRatePercent: annualRate,
    };
  }

  /**
   * Calcula o impacto de acelerar ou atrasar a meta prioritária
   */
  static calculateGoalImpact(
    amount: number,
    isRecurring: boolean,
    goals: SavingGoal[] = [],
    monthlyIncome: number = 6000
  ): WhatIfGoalImpact | undefined {
    const activeGoals = goals.filter(
      (g) => !g.isCompleted && g.targetAmount > g.currentAmount
    );
    if (activeGoals.length === 0) return undefined;

    // Prioriza meta com menor prazo ou mais adiantada
    const primaryGoal = [...activeGoals].sort((a, b) => {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return dateA - dateB;
    })[0];

    const remaining = Math.max(0, primaryGoal.targetAmount - primaryGoal.currentAmount);
    if (remaining <= 0) return undefined;

    const pct = Math.min(100.0, (amount / remaining) * 100.0);

    // Capacidade de poupança estimada: 15% da renda mensal
    const monthlySavingsCapacity = Math.max(50.0, monthlyIncome * 0.15);
    const dailySavingsCapacity = monthlySavingsCapacity / 30.0;

    const daysIfOneOff = Math.max(1, Math.round(amount / dailySavingsCapacity));
    const days = isRecurring ? daysIfOneOff * 6 : daysIfOneOff;

    return {
      goalName: primaryGoal.name,
      remainingTarget: Math.round(remaining * 100) / 100,
      daysAcceleratedIfSaved: days,
      daysDelayedIfSpent: days,
      percentOfGoalRemaining: Math.round(pct * 10) / 10,
    };
  }

  /**
   * Calcula o impacto no orçamento diário seguro até o encerramento do mês
   */
  static calculateBudgetImpact(
    amount: number,
    isRecurring: boolean,
    monthlyIncome: number = 6000,
    currentMonthSpent: number = 0,
    monthlyBudget?: number,
    daysRemaining: number = 12
  ): WhatIfBudgetImpact {
    const safeDays = Math.max(1, daysRemaining);
    const ceiling =
      monthlyBudget && monthlyBudget > 0
        ? monthlyBudget
        : monthlyIncome > 0
        ? monthlyIncome * 0.7
        : 1500;

    const currentRemainingCeiling = Math.max(0, ceiling - currentMonthSpent);
    const currentDailySafe = currentRemainingCeiling / safeDays;

    const newRemainingCeiling = Math.max(0, currentRemainingCeiling - amount);
    const newDailySafe = newRemainingCeiling / safeDays;
    const reduction = currentDailySafe - newDailySafe;

    const incomePct = monthlyIncome > 0 ? (amount / monthlyIncome) * 100.0 : 0.0;
    const willExceed = currentMonthSpent + amount > ceiling;

    return {
      currentDailySafeSpend: Math.round(currentDailySafe * 100) / 100,
      newDailySafeSpend: Math.round(newDailySafe * 100) / 100,
      dailySpendReduction: Math.round(Math.max(0, reduction) * 100) / 100,
      percentOfMonthlyIncome: Math.round(incomePct * 10) / 10,
      willExceedBudget: willExceed,
    };
  }

  /**
   * Determina a gravidade do efeito borboleta
   */
  static determineImpactLevel(
    amount: number,
    isRecurring: boolean,
    monthlyIncome: number,
    budgetImpact?: WhatIfBudgetImpact
  ): {
    level: ButterflyImpactLevel;
    label: string;
    emoji: string;
    colorHex: string;
  } {
    const effectivePct =
      monthlyIncome > 0 ? (amount / monthlyIncome) * 100.0 : 5.0;
    const weightedPct = isRecurring ? effectivePct * 4.0 : effectivePct;

    if (budgetImpact?.willExceedBudget === true || weightedPct >= 25.0) {
      return {
        level: 'critical',
        label: 'Crítico',
        emoji: '🚨',
        colorHex: '#A855F7',
      };
    } else if (weightedPct >= 12.0) {
      return {
        level: 'high',
        label: 'Significativo',
        emoji: '🔥',
        colorHex: '#EF4444',
      };
    } else if (weightedPct >= 4.0) {
      return {
        level: 'moderate',
        label: 'Moderado',
        emoji: '⚡️',
        colorHex: '#F59E0B',
      };
    } else {
      return {
        level: 'low',
        label: 'Leve',
        emoji: '🌱',
        colorHex: '#10B981',
      };
    }
  }

  /**
   * Gera copy orientadora personalizada de alto valor
   */
  static generateAdvice(
    amount: number,
    isRecurring: boolean,
    impactLevel: ButterflyImpactLevel,
    opportunity: WhatIfOpportunityCost,
    goalImpact?: WhatIfGoalImpact
  ): { headline: string; detail: string } {
    const fiveYStr = formatCurrency(opportunity.fiveYearsValue);
    const tenYStr = formatCurrency(opportunity.tenYearsValue);

    if (isRecurring) {
      return {
        headline: 'Uma pequena assinatura, um grande impacto futuro',
        detail: `Se investido a 8% ao ano, esse gasto recorrente acumularia ${fiveYStr} em 5 anos e ${tenYStr} em 10 anos. Pense se esse serviço traz retorno equivalente ao seu bem-estar.`,
      };
    }

    switch (impactLevel) {
      case 'low':
        return {
          headline: 'Decisão com baixo impacto no seu equilíbrio',
          detail: `Este gasto cabe com folga no seu orçamento. Se preferir poupar, renderia ${fiveYStr} em 5 anos.`,
        };
      case 'moderate':
        if (goalImpact) {
          return {
            headline: `Pausa para reflexão: ${goalImpact.daysAcceleratedIfSaved} dias mais perto da sua meta`,
            detail: `Se guardar este valor na meta '${goalImpact.goalName}', você antecipará o objetivo em ${goalImpact.daysAcceleratedIfSaved} dias.`,
          };
        } else {
          return {
            headline: 'Impacto moderado nas suas finanças',
            detail: `Investido com juros compostos a 8% a.a., esse valor se transforma em ${fiveYStr} em 5 anos.`,
          };
        }
      case 'high':
        return {
          headline: 'Atenção: Impacto sensível nas suas metas',
          detail: `Este gasto consome uma fatia relevante do seu saldo livre. Em 10 anos, esse capital renderia ${tenYStr}.`,
        };
      case 'critical':
        return {
          headline: 'Alerta de Efeito Borboleta Crítico',
          detail: `Essa decisão pode comprometer o teto do mês ou desviar consideravelmente suas metas de poupança prioritárias.`,
        };
    }
  }

  /**
   * Executa a análise completa What-If
   */
  static analyze(
    amount: number,
    isRecurringMonthly: boolean = false,
    goals: SavingGoal[] = [],
    monthlyIncome: number = 6000,
    currentMonthSpent: number = 0,
    monthlyBudget?: number,
    daysRemainingInMonth: number = 12,
    annualRatePercent: number = 8.0
  ): WhatIfAnalysisResult {
    const rawAmount = Math.max(0, amount);

    const opportunity = this.calculateOpportunityCost(
      rawAmount,
      isRecurringMonthly,
      annualRatePercent
    );

    const goalImpact = this.calculateGoalImpact(
      rawAmount,
      isRecurringMonthly,
      goals,
      monthlyIncome
    );

    const budgetImpact = this.calculateBudgetImpact(
      rawAmount,
      isRecurringMonthly,
      monthlyIncome,
      currentMonthSpent,
      monthlyBudget,
      daysRemainingInMonth
    );

    const impact = this.determineImpactLevel(
      rawAmount,
      isRecurringMonthly,
      monthlyIncome,
      budgetImpact
    );

    // Horas de vida equivalentes
    const hourlyRate = monthlyIncome > 0 ? monthlyIncome / (40 * 4.3333) : 34.61;
    const hours = hourlyRate > 0 ? rawAmount / hourlyRate : 0;
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    const lifeTimeFormatted = `${wholeHours}h ${minutes}min de trabalho`;

    const advice = this.generateAdvice(
      rawAmount,
      isRecurringMonthly,
      impact.level,
      opportunity,
      goalImpact
    );

    return {
      amount: rawAmount,
      isRecurringMonthly,
      impactLevel: impact.level,
      impactLevelLabel: impact.label,
      impactEmoji: impact.emoji,
      impactColorHex: impact.colorHex,
      goalImpact,
      opportunityCost: opportunity,
      budgetImpact,
      lifeTimeHours: Math.round(hours * 10) / 10,
      lifeTimeFormatted,
      headlineAdvice: advice.headline,
      detailedAdvice: advice.detail,
    };
  }
}
