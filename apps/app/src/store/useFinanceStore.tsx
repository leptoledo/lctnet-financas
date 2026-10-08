import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Transaction,
  Account,
  SavingGoal,
  Budget,
  RecurringTransaction,
  InstallmentGroup,
  SharedSpace,
  SharedExpenseItem,
  SharedSettlement,
  Category,
  SpendingPaceReport,
  CreditCardInvoice,
  SharedBalanceSummary,
  VampireLeakReport,
  CashFlowForecastReport,
  calculateSpendingPace,
  calculateCreditCardInvoices,
  calculateSharedBalance,
  VampireDetectorEngine,
  CashFlowForecastEngine,
  calculateTotalNetWorth,
  calculateBalanceSummary
} from '@financas/core';
import {
  INITIAL_CATEGORIES,
  INITIAL_ACCOUNTS,
  INITIAL_GOALS,
  INITIAL_BUDGETS,
  INITIAL_RECURRING,
  INITIAL_INSTALLMENTS,
  INITIAL_SHARED_SPACE,
  INITIAL_SHARED_EXPENSES,
  INITIAL_SHARED_SETTLEMENTS,
  INITIAL_TRANSACTIONS
} from './initialData';
import { ActiveTab, ActiveModal } from '../types';

export interface UserProfileState {
  name: string;
  monthlyIncome: number;
  weeklyHours: number;
  partnerName: string;
}

interface FinanceContextType {
  // State
  transactions: Transaction[];
  accounts: Account[];
  goals: SavingGoal[];
  budgets: Budget[];
  recurring: RecurringTransaction[];
  installments: InstallmentGroup[];
  sharedSpace: SharedSpace;
  sharedExpenses: SharedExpenseItem[];
  sharedSettlements: SharedSettlement[];
  categories: Category[];
  privacyShield: boolean;
  theme: 'dark' | 'light';
  activeTab: ActiveTab;
  activeModal: ActiveModal;
  modalPayload: any;
  referenceMonth: string;
  userProfile: UserProfileState;

  // Actions
  setPrivacyShield: (val: boolean | ((prev: boolean) => boolean)) => void;
  togglePrivacyShield: () => void;
  toggleTheme: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  setReferenceMonth: (m: string) => void;
  openModal: (modal: ActiveModal, payload?: any) => void;
  closeModal: () => void;
  updateUserProfile: (data: Partial<UserProfileState>) => void;

  // CRUD
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addAccount: (acc: Omit<Account, 'id'>) => void;
  updateAccount: (acc: Account) => void;
  deleteAccount: (id: string) => void;
  addGoal: (goal: Omit<SavingGoal, 'id'>) => void;
  updateGoal: (goal: SavingGoal) => void;
  deleteGoal: (id: string) => void;
  updateBudget: (budget: Budget) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  addSharedExpense: (item: Omit<SharedExpenseItem, 'id'>) => void;
  addSharedSettlement: (item: Omit<SharedSettlement, 'id'>) => void;
  resetToDefaults: () => void;

  // Derived Calculations
  totalNetWorth: number;
  currentMonthIncome: number;
  currentMonthExpense: number;
  currentMonthBalance: number;
  spendingPace: SpendingPaceReport;
  creditCardInvoices: CreditCardInvoice[];
  sharedBalance: SharedBalanceSummary;
  vampireReport: VampireLeakReport;
  cashFlowForecast: CashFlowForecastReport;
}

const STORAGE_KEY = '@financas:v2:data';
const PREFS_KEY = '@financas:v2:prefs';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial raw state
  const loadSaved = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Erro ao carregar dados do LocalStorage:', e);
    }
    return null;
  };

  const loadPrefs = () => {
    try {
      const prefs = localStorage.getItem(PREFS_KEY);
      if (prefs) return JSON.parse(prefs);
    } catch (e) {}
    return {
      privacyShield: false,
      theme: 'dark' as const,
      userProfile: {
        name: 'Leandro Toledo',
        monthlyIncome: 6500,
        weeklyHours: 40,
        partnerName: 'Ana'
      }
    };
  };

  const saved = loadSaved();
  const savedPrefs = loadPrefs();

  const [transactions, setTransactions] = useState<Transaction[]>(saved?.transactions || INITIAL_TRANSACTIONS);
  const [accounts, setAccounts] = useState<Account[]>(saved?.accounts || INITIAL_ACCOUNTS);
  const [goals, setGoals] = useState<SavingGoal[]>(saved?.goals || INITIAL_GOALS);
  const [budgets, setBudgets] = useState<Budget[]>(saved?.budgets || INITIAL_BUDGETS);
  const [recurring, setRecurring] = useState<RecurringTransaction[]>(saved?.recurring || INITIAL_RECURRING);
  const [installments, setInstallments] = useState<InstallmentGroup[]>(saved?.installments || INITIAL_INSTALLMENTS);
  const [sharedSpace, setSharedSpace] = useState<SharedSpace>(saved?.sharedSpace || INITIAL_SHARED_SPACE);
  const [sharedExpenses, setSharedExpenses] = useState<SharedExpenseItem[]>(saved?.sharedExpenses || INITIAL_SHARED_EXPENSES);
  const [sharedSettlements, setSharedSettlements] = useState<SharedSettlement[]>(saved?.sharedSettlements || INITIAL_SHARED_SETTLEMENTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // UI state
  const [privacyShield, setPrivacyShield] = useState<boolean>(savedPrefs.privacyShield ?? false);
  const [theme, setTheme] = useState<'dark' | 'light'>(savedPrefs.theme || 'dark');
  const [userProfile, setUserProfileState] = useState<UserProfileState>(savedPrefs.userProfile || {
    name: 'Leandro Toledo',
    monthlyIncome: 6500,
    weeklyHours: 40,
    partnerName: 'Ana'
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);
  const [referenceMonth, setReferenceMonth] = useState<string>('2026-05');

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        transactions,
        accounts,
        goals,
        budgets,
        recurring,
        installments,
        sharedSpace,
        sharedExpenses,
        sharedSettlements
      }));
    } catch (e) {
      console.error('Falha ao persistir dados:', e);
    }
  }, [transactions, accounts, goals, budgets, recurring, installments, sharedSpace, sharedExpenses, sharedSettlements]);

  // Sync Preferences & Theme
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({
        privacyShield,
        theme,
        userProfile
      }));
    } catch (e) {}

    document.documentElement.setAttribute('data-theme', theme);
  }, [privacyShield, theme, userProfile]);

  // Actions
  const togglePrivacyShield = () => setPrivacyShield(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const openModal = (modal: ActiveModal, payload?: any) => {
    setModalPayload(payload || null);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  const updateUserProfile = (data: Partial<UserProfileState>) => {
    setUserProfileState(prev => ({ ...prev, ...data }));
    if (data.partnerName) {
      setSharedSpace(prev => ({ ...prev, partnerName: data.partnerName! }));
    }
  };

  // CRUD Transações
  const addTransaction = (txData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...txData,
      id: `tx-${Date.now()}`
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateTransaction = (updatedTx: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // CRUD Contas
  const addAccount = (accData: Omit<Account, 'id'>) => {
    const newAcc: Account = {
      ...accData,
      id: `acc-${Date.now()}`
    };
    setAccounts(prev => [...prev, newAcc]);
  };

  const updateAccount = (updatedAcc: Account) => {
    setAccounts(prev => prev.map(a => a.id === updatedAcc.id ? updatedAcc : a));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  // CRUD Metas
  const addGoal = (goalData: Omit<SavingGoal, 'id'>) => {
    const newGoal: SavingGoal = {
      ...goalData,
      id: `goal-${Date.now()}`
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (updatedGoal: SavingGoal) => {
    setGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // CRUD Orçamentos
  const updateBudget = (updatedBud: Budget) => {
    setBudgets(prev => prev.map(b => b.id === updatedBud.id ? updatedBud : b));
  };

  const addBudget = (budgetData: Omit<Budget, 'id'>) => {
    const newBud: Budget = {
      ...budgetData,
      id: `bud-${Date.now()}`
    };
    setBudgets(prev => [...prev, newBud]);
  };

  const addSharedExpense = (expenseData: Omit<SharedExpenseItem, 'id'>) => {
    const newItem: SharedExpenseItem = {
      ...expenseData,
      id: `se-${Date.now()}`
    };
    setSharedExpenses(prev => [newItem, ...prev]);
  };

  // Finanças Compartilhadas Acerto
  const addSharedSettlement = (settlementData: Omit<SharedSettlement, 'id'>) => {
    const newSet: SharedSettlement = {
      ...settlementData,
      id: `set-${Date.now()}`
    };
    setSharedSettlements(prev => [...prev, newSet]);

    // Opcionalmente registra como transação financeira
    const account = accounts[0];
    if (account) {
      addTransaction({
        name: `Acerto Modo Casal (${sharedSpace.partnerName})`,
        amount: settlementData.amount,
        type: settlementData.payer === 'me' ? 'expense' : 'income',
        category: 'Outros',
        date: settlementData.date,
        accountId: account.id,
        notes: settlementData.notes
      });
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PREFS_KEY);
    setTransactions(INITIAL_TRANSACTIONS);
    setAccounts(INITIAL_ACCOUNTS);
    setGoals(INITIAL_GOALS);
    setBudgets(INITIAL_BUDGETS);
    setRecurring(INITIAL_RECURRING);
    setInstallments(INITIAL_INSTALLMENTS);
    setSharedSpace(INITIAL_SHARED_SPACE);
    setSharedExpenses(INITIAL_SHARED_EXPENSES);
    setSharedSettlements(INITIAL_SHARED_SETTLEMENTS);
    setPrivacyShield(false);
    setTheme('dark');
    setUserProfileState({
      name: 'Leandro Toledo',
      monthlyIncome: 6500,
      weeklyHours: 40,
      partnerName: 'Ana'
    });
  };

  // Motor 1: Saldo Patrimonial e Mês
  const totalNetWorth = useMemo(() => {
    return calculateTotalNetWorth(accounts, transactions);
  }, [accounts, transactions]);

  const monthSummary = useMemo(() => {
    const currentMonthTxs = transactions.filter(t => t.date.startsWith(referenceMonth));
    const summary = calculateBalanceSummary(currentMonthTxs);
    return summary;
  }, [transactions, referenceMonth]);

  // Motor 2: Ritmo de Gastos (Spending Pace)
  const spendingPace = useMemo(() => {
    const refDate = new Date(`${referenceMonth}-19T12:00:00`);
    return calculateSpendingPace(transactions, budgets, refDate);
  }, [transactions, budgets, referenceMonth]);

  // Motor 3: Cartão de Crédito Black & Faturas
  const creditCardInvoices = useMemo(() => {
    const refDate = new Date(`${referenceMonth}-19T12:00:00`);
    return calculateCreditCardInvoices(transactions, undefined, refDate);
  }, [transactions, referenceMonth]);

  // Motor 4: Finanças Compartilhadas / Modo Casal
  const sharedBalance = useMemo(() => {
    return calculateSharedBalance(sharedExpenses, sharedSettlements, sharedSpace);
  }, [sharedExpenses, sharedSettlements, sharedSpace]);

  // Motor 5: Detector Vampiro de Assinaturas & Inflação
  const vampireReport = useMemo(() => {
    return VampireDetectorEngine.analyze(
      transactions,
      recurring,
      userProfile.monthlyIncome,
      userProfile.weeklyHours,
      `${referenceMonth}-19`
    );
  }, [transactions, recurring, userProfile, referenceMonth]);

  // Motor 6: Fluxo de Caixa Preditivo a 30 dias
  const cashFlowForecast = useMemo(() => {
    const cardDebts = creditCardInvoices
      .filter(i => i.status === 'open' && i.totalAmount > 0)
      .map(i => ({ dueDay: 5, debt: i.totalAmount, cardName: 'Cartão Black' }));

    return CashFlowForecastEngine.generateForecast(
      accounts,
      recurring,
      [],
      cardDebts,
      30,
      `${referenceMonth}-19`
    );
  }, [accounts, recurring, creditCardInvoices, referenceMonth]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        accounts,
        goals,
        budgets,
        recurring,
        installments,
        sharedSpace,
        sharedExpenses,
        sharedSettlements,
        categories,
        privacyShield,
        theme,
        activeTab,
        activeModal,
        modalPayload,
        referenceMonth,
        userProfile,
        setPrivacyShield,
        togglePrivacyShield,
        toggleTheme,
        setActiveTab,
        setReferenceMonth,
        openModal,
        closeModal,
        updateUserProfile,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addAccount,
        updateAccount,
        deleteAccount,
        addGoal,
        updateGoal,
        deleteGoal,
        updateBudget,
        addBudget,
        addSharedExpense,
        addSharedSettlement,
        resetToDefaults,
        totalNetWorth,
        currentMonthIncome: monthSummary.income,
        currentMonthExpense: monthSummary.expense,
        currentMonthBalance: monthSummary.balance,
        spendingPace,
        creditCardInvoices,
        sharedBalance,
        vampireReport,
        cashFlowForecast
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinanceStore = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinanceStore deve ser usado dentro de um FinanceProvider');
  }
  return context;
};
