/**
 * Motor de Projeção Financeira e Simulador de Metas
 * Fiel a ViewsGoalsGoalSimulatorView.swift
 */

export interface SimulationResult {
  monthsNeeded: number;
  monthlyContribution: number;
  totalInvested: number;
  totalInterestEarned: number;
  finalAmount: number;
  estimatedCompletionDate: string; // ISO date YYYY-MM-DD
}

export class GoalProjectionEngine {
  /**
   * Simula o tempo necessário dado um aporte mensal fixo com juros compostos.
   * Fiel a ViewsGoalsGoalSimulatorView.swift
   */
  static simulateMonths(
    currentAmount: number,
    targetAmount: number,
    monthlyContribution: number,
    annualRatePercent: number = 10.5,
    referenceDate: Date = new Date('2026-05-19')
  ): SimulationResult {
    if (targetAmount <= currentAmount || monthlyContribution <= 0) {
      return {
        monthsNeeded: 0,
        monthlyContribution,
        totalInvested: currentAmount,
        totalInterestEarned: 0,
        finalAmount: currentAmount,
        estimatedCompletionDate: referenceDate.toISOString().split('T')[0]
      };
    }

    const monthlyRate = (annualRatePercent / 100.0) / 12.0;
    let balance = currentAmount;
    let months = 0;
    let totalDeposited = balance;

    // Simulação mês a mês até 600 meses (50 anos limite seguro)
    while (balance < targetAmount && months < 600) {
      months += 1;
      balance += balance * monthlyRate;
      balance += monthlyContribution;
      totalDeposited += monthlyContribution;
    }

    const interestEarned = Math.max(0, balance - totalDeposited);
    const completionDate = new Date(referenceDate);
    completionDate.setMonth(completionDate.getMonth() + months);

    return {
      monthsNeeded: months,
      monthlyContribution,
      totalInvested: totalDeposited,
      totalInterestEarned: interestEarned,
      finalAmount: balance,
      estimatedCompletionDate: completionDate.toISOString().split('T')[0]
    };
  }

  /**
   * Simula o aporte mensal necessário dado um prazo em meses.
   * Utiliza a fórmula de anuidade com juros compostos:
   * FV = PV*(1+i)^n + PMT * [((1+i)^n - 1) / i]
   * Fiel a ViewsGoalsGoalSimulatorView.swift
   */
  static simulateMonthlyContribution(
    currentAmount: number,
    targetAmount: number,
    targetMonths: number,
    annualRatePercent: number = 10.5,
    referenceDate: Date = new Date('2026-05-19')
  ): SimulationResult {
    if (targetMonths <= 0 || targetAmount <= currentAmount) {
      return {
        monthsNeeded: targetMonths,
        monthlyContribution: 0,
        totalInvested: currentAmount,
        totalInterestEarned: 0,
        finalAmount: currentAmount,
        estimatedCompletionDate: referenceDate.toISOString().split('T')[0]
      };
    }

    const monthlyRate = (annualRatePercent / 100.0) / 12.0;
    const current = currentAmount;
    const target = targetAmount;
    const n = targetMonths;

    let requiredMonthlyDeposit = 0;
    if (monthlyRate <= 0.00001) {
      requiredMonthlyDeposit = (target - current) / n;
    } else {
      const compoundGrowth = Math.pow(1.0 + monthlyRate, n);
      const futureValueOfCurrent = current * compoundGrowth;
      const remainingNeeded = target - futureValueOfCurrent;
      if (remainingNeeded <= 0) {
        requiredMonthlyDeposit = 0;
      } else {
        const annuityFactor = (compoundGrowth - 1.0) / monthlyRate;
        requiredMonthlyDeposit = remainingNeeded / annuityFactor;
      }
    }

    const deposit = Math.max(0, requiredMonthlyDeposit);
    return this.simulateMonths(
      currentAmount,
      targetAmount,
      deposit,
      annualRatePercent,
      referenceDate
    );
  }
}
