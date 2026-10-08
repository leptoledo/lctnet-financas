/**
 * @financas/core - Modelos de Dados & Tipos TypeScript
 * Espelha rigorosamente o schema do PostgreSQL no Supabase e os modelos SwiftData do iOS
 */

export type TransactionType = 'income' | 'expense';

export type AccountType = 
  | 'Conta Corrente' 
  | 'Poupança' 
  | 'Cartão de Crédito' 
  | 'Dinheiro' 
  | 'Investimento';

export type TimePeriod = 'week' | 'month' | 'year' | 'all';

export type CurrencyCode = 'BRL' | 'USD' | 'EUR';

export interface Category {
  id: string;
  userId?: string;
  name: string;
  iconName: string;
  colorHex: string;
  updatedAt?: string;
}

export interface Account {
  id: string;
  userId?: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  colorHex: string;
  iconName: string;
  currentBalance?: number;
  updatedAt?: string;
}

export interface Transaction {
  id: string;
  userId?: string;
  name: string;
  amount: number;
  date: string; // YYYY-MM-DD
  type: TransactionType;
  category: string;
  categoryId?: string;
  accountId: string;
  goalId?: string;
  notes?: string;
  updatedAt?: string;
}

export interface SavingGoal {
  id: string;
  userId?: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string; // YYYY-MM-DD
  colorHex: string;
  iconName: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Budget {
  id: string;
  userId?: string;
  month: number;
  year: number;
  category: string;
  limit: number;
  spent?: number;
  updatedAt?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  currencyCode: CurrencyCode;
  isPro: boolean;
  createdAt?: string;
}

export interface CategoryExpenseSummary {
  name: string;
  amount: number;
  percentage: number;
  colorHex: string;
  iconName: string;
}

export interface BalanceSummary {
  income: number;
  expense: number;
  balance: number;
}

export interface MonthlyTrendPoint {
  label: string;
  income: number;
  expense: number;
}

// --- BLOCO 1: INTELIGÊNCIA & DASHBOARD ---

export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurringTransaction {
  id: string;
  userId?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: string;
  accountId: string;
  frequency: RecurrenceFrequency;
  nextDueDate: string; // YYYY-MM-DD
  isActive: boolean;
  notes?: string;
  updatedAt?: string;
}

export type PaceStatus = 'onTrack' | 'caution' | 'overspending';

export interface SpendingPaceReport {
  currentDay: number;
  daysInMonth: number;
  daysRemaining: number;
  spentSoFar: number;
  idealSpentSoFar: number;
  dailyBurnRate: number;
  idealDailyBurnRate: number;
  projectedMonthEnd: number;
  totalBudgetLimit: number;
  paceStatus: PaceStatus;
  statusLabel: string;
  percentageUsed: number;
  differenceToIdeal: number; // positivo se gastou a mais que o ideal
}

export interface TimeToEarnConfig {
  isEnabled: boolean;
  monthlyIncome: number;
  weeklyWorkHours: number;
  workDaysPerWeek: number;
}

export interface TimeToEarnResult {
  hours: number;
  minutes: number;
  formattedString: string;
}

// --- BLOCO 2: FINANÇAS AVANÇADAS (CARTÃO, PARCELAMENTOS & MODO CASAL) ---

export type InvoiceStatus = 'open' | 'closed' | 'overdue' | 'paid';

export interface CreditCardConfig {
  accountId: string;
  creditLimit: number;
  closingDay: number; // ex: 25
  dueDay: number;     // ex: 5
}

export interface CreditCardInvoice {
  id: string; // YYYY-MM
  month: number;
  year: number;
  monthTitle: string;
  startDate: string;
  closingDate: string;
  dueDate: string;
  status: InvoiceStatus;
  totalAmount: number;
  transactions: Transaction[];
  bestDayToBuy: string; // dia seguinte ao fechamento
}

export interface InstallmentGroup {
  id: string;
  baseName: string;
  totalAmount: number;
  installmentAmount: number;
  paidCount: number;
  totalCount: number;
  frequency: 'monthly' | 'weekly';
  firstDueDate: string;
  nextDueDate: string;
  category: string;
  accountId: string;
  isFullyPaid: boolean;
}

export interface SharedSpace {
  id: string;
  name: string;
  partnerName: string;
  partnerEmail?: string;
  defaultSplitRatio: number; // 0.5 para 50/50
  inviteCode: string;
  createdAt: string;
}

export interface SharedSettlement {
  id: string;
  spaceId: string;
  amount: number;
  date: string;
  payer: 'me' | 'partner';
  notes?: string;
}

export type SharedBalanceStatus = 'partnerOwesMe' | 'iOwePartner' | 'settled';

export interface SharedBalanceSummary {
  totalSharedExpenses: number;
  totalPaidByMe: number;
  totalPaidByPartner: number;
  myTotalShare: number;
  partnerTotalShare: number;
  netBalance: number; // > 0 => parceiro me deve; < 0 => eu devo; == 0 => quitado
  status: SharedBalanceStatus;
  statusMessage: string;
  partnerName: string;
  outstandingAmount: number;
}

// --- BLOCO 4: INTELIGÊNCIA PREDITIVA & OTIMIZAÇÃO FINANCEIRA ---

export type VampireHealthGrade = 'A+' | 'A' | 'B' | 'C' | 'D';

export interface PriceHike {
  previousAmount: number;
  currentAmount: number;
  percentIncrease: number;
}

export interface VampireSubscription {
  id: string;
  name: string;
  categoryName: string;
  monthlyCost: number;
  annualCost: number;
  frequencyLabel: string;
  isRegisteredRecurrence: boolean;
  lastChargedDate?: string;
  priceHike?: PriceHike;
  cancellationUrlString?: string;
}

export interface CategoryInflation {
  categoryName: string;
  currentMonthSpent: number;
  previousMonthSpent: number;
  ratePercent: number;
}

export interface PersonalInflationRate {
  overallRatePercent: number;
  categoryInflations: CategoryInflation[];
  currentPeriodTotal: number;
  previousPeriodTotal: number;
  mainDriverCategory?: string;
}

export interface VampireLeakReport {
  subscriptions: VampireSubscription[];
  totalMonthlyDrain: number;
  totalAnnualDrain: number;
  annualWorkingDaysDrained: number;
  priceHikes: VampireSubscription[];
  inflation: PersonalInflationRate;
  vampireHealthGrade: VampireHealthGrade;
  adviceSummary: string;
}

export type ButterflyImpactLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface WhatIfGoalImpact {
  goalName: string;
  remainingTarget: number;
  daysAcceleratedIfSaved: number;
  daysDelayedIfSpent: number;
  percentOfGoalRemaining: number;
}

export interface WhatIfOpportunityCost {
  oneYearValue: number;
  fiveYearsValue: number;
  tenYearsValue: number;
  totalInterestTenYears: number;
  annualRatePercent: number;
}

export interface WhatIfBudgetImpact {
  currentDailySafeSpend: number;
  newDailySafeSpend: number;
  dailySpendReduction: number;
  percentOfMonthlyIncome: number;
  willExceedBudget: boolean;
}

export interface WhatIfAnalysisResult {
  amount: number;
  isRecurringMonthly: boolean;
  impactLevel: ButterflyImpactLevel;
  impactLevelLabel: string;
  impactEmoji: string;
  impactColorHex: string;
  goalImpact?: WhatIfGoalImpact;
  opportunityCost: WhatIfOpportunityCost;
  budgetImpact?: WhatIfBudgetImpact;
  lifeTimeHours: number;
  lifeTimeFormatted: string;
  headlineAdvice: string;
  detailedAdvice: string;
}

export type CashFlowRiskSeverity = 'critical' | 'warning' | 'healthy';

export interface CashFlowRiskAlert {
  id: string;
  accountId: string;
  accountName: string;
  accountIcon: string;
  predictedDate: string; // YYYY-MM-DD
  projectedBalance: number;
  projectedDeficit: number;
  severity: CashFlowRiskSeverity;
  causeDescription: string;
  suggestedRescueAccountId?: string;
  suggestedRescueAccountName?: string;
  suggestedTransferAmount: number;
}

export interface CashFlowDailyPoint {
  date: string; // YYYY-MM-DD
  balance: number;
  scheduledIncomes: number;
  scheduledExpenses: number;
  isNegative: boolean;
}

export interface CashFlowForecastReport {
  daysProjected: number;
  alerts: CashFlowRiskAlert[];
  overallSeverity: CashFlowRiskSeverity;
  lowestProjectedBalance: number;
  lowestBalanceDate?: string;
  dailyPoints: CashFlowDailyPoint[];
  headlineAdvice: string;
}


