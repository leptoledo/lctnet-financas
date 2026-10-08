import { 
  Transaction, 
  Account, 
  SavingGoal, 
  Budget, 
  RecurringTransaction, 
  SharedExpenseItem, 
  SharedSettlement,
  SharedSpace,
  InstallmentGroup,
  DEFAULT_CATEGORIES,
  DEFAULT_ACCOUNTS,
  DEFAULT_GOALS,
  DEFAULT_BUDGETS,
  DEFAULT_RECURRING_TRANSACTIONS,
  DEFAULT_INSTALLMENTS,
  DEFAULT_SHARED_SPACE,
  DEFAULT_SHARED_EXPENSES,
  DEFAULT_SHARED_SETTLEMENTS
} from '@financas/core';

export const INITIAL_CATEGORIES = DEFAULT_CATEGORIES;
export const INITIAL_ACCOUNTS: Account[] = DEFAULT_ACCOUNTS;
export const INITIAL_GOALS: SavingGoal[] = DEFAULT_GOALS;
export const INITIAL_BUDGETS: Budget[] = DEFAULT_BUDGETS;
export const INITIAL_RECURRING: RecurringTransaction[] = DEFAULT_RECURRING_TRANSACTIONS;
export const INITIAL_INSTALLMENTS: InstallmentGroup[] = DEFAULT_INSTALLMENTS;
export const INITIAL_SHARED_SPACE: SharedSpace = DEFAULT_SHARED_SPACE;
export const INITIAL_SHARED_EXPENSES: SharedExpenseItem[] = DEFAULT_SHARED_EXPENSES;
export const INITIAL_SHARED_SETTLEMENTS: SharedSettlement[] = DEFAULT_SHARED_SETTLEMENTS;

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // Maio 2026
  { id: 'tx-71', name: 'Condomínio', type: 'expense', category: 'Moradia', amount: 450.00, date: '2026-05-19', notes: '', accountId: 'acc-1' },
  { id: 'tx-70', name: 'Almoço restaurante', type: 'expense', category: 'Alimentação', amount: 58.00, date: '2026-05-19', notes: '', accountId: 'acc-1' },
  { id: 'tx-69', name: 'Rendimentos CDB', type: 'income', category: 'Rendimentos', amount: 310.00, date: '2026-05-18', notes: '', accountId: 'acc-2' },
  { id: 'tx-68', name: 'Presente Dia das Mães', type: 'expense', category: 'Outros', amount: 280.00, date: '2026-05-17', notes: '', accountId: 'acc-3' },
  { id: 'tx-67', name: 'Tênis Nike Air Max (1/3)', type: 'expense', category: 'Vestuário', amount: 133.00, date: '2026-05-16', notes: 'Parcela 1/3', accountId: 'acc-3' },
  { id: 'tx-66', name: 'Notebook Dell (7/10)', type: 'expense', category: 'Educação', amount: 380.00, date: '2026-05-15', notes: 'Parcela 7/10', accountId: 'acc-3' },
  { id: 'tx-65', name: 'Venda notebook antigo', type: 'income', category: 'Renda', amount: 1800.00, date: '2026-05-15', notes: 'OLX', accountId: 'acc-1' },
  { id: 'tx-64', name: 'Farmácia', type: 'expense', category: 'Saúde', amount: 61.50, date: '2026-05-14', notes: '', accountId: 'acc-1' },
  { id: 'tx-63', name: 'Internet Fibra 600MB', type: 'expense', category: 'Serviços essenciais', amount: 99.90, date: '2026-05-13', notes: '', accountId: 'acc-1' },
  { id: 'tx-62', name: 'Seguro carro', type: 'expense', category: 'Seguros', amount: 210.00, date: '2026-05-12', notes: '', accountId: 'acc-1' },
  { id: 'tx-61', name: 'iFood Jantar Especial', type: 'expense', category: 'Alimentação', amount: 92.00, date: '2026-05-11', notes: '', accountId: 'acc-3' },
  { id: 'tx-60', name: 'Renda Consultoria Freelance', type: 'income', category: 'Renda', amount: 800.00, date: '2026-05-10', notes: '', accountId: 'acc-1' },
  { id: 'tx-59', name: 'Curso UX/UI Design', type: 'expense', category: 'Educação', amount: 249.00, date: '2026-05-09', notes: '', accountId: 'acc-3' },
  { id: 'tx-58', name: 'Spotify Família', type: 'expense', category: 'Lazer', amount: 21.90, date: '2026-05-08', notes: '', accountId: 'acc-3' },
  { id: 'tx-57', name: 'Netflix Premium', type: 'expense', category: 'Lazer', amount: 55.90, date: '2026-05-08', notes: '', accountId: 'acc-3' },
  { id: 'tx-56', name: 'Academia SmartFit', type: 'expense', category: 'Saúde', amount: 99.90, date: '2026-05-07', notes: '', accountId: 'acc-1' },
  { id: 'tx-55', name: 'Gasolina Posto Shell', type: 'expense', category: 'Transporte', amount: 190.00, date: '2026-05-06', notes: '', accountId: 'acc-1' },
  { id: 'tx-54', name: 'Conta de água', type: 'expense', category: 'Serviços essenciais', amount: 71.00, date: '2026-05-05', notes: '', accountId: 'acc-1' },
  { id: 'tx-53', name: 'Conta de luz Enel', type: 'expense', category: 'Serviços essenciais', amount: 156.40, date: '2026-05-05', notes: '', accountId: 'acc-1' },
  { id: 'tx-52', name: 'Aluguel do Apartamento', type: 'expense', category: 'Moradia', amount: 1800.00, date: '2026-05-03', notes: '', accountId: 'acc-1' },
  { id: 'tx-51', name: 'Supermercado Extra', type: 'expense', category: 'Alimentação', amount: 378.20, date: '2026-05-02', notes: '', accountId: 'acc-1' },
  { id: 'tx-50', name: 'Salário Mensal', type: 'income', category: 'Salário', amount: 6500.00, date: '2026-05-01', notes: '', accountId: 'acc-1' },

  // Abril 2026
  { id: 'tx-49', name: 'Fatura Cartão Nubank', type: 'expense', category: 'Crédito', amount: 680.00, date: '2026-04-30', notes: '', accountId: 'acc-1' },
  { id: 'tx-35', name: 'Supermercado Pão de Açúcar', type: 'expense', category: 'Alimentação', amount: 410.80, date: '2026-04-02', notes: '', accountId: 'acc-1' },
  { id: 'tx-36', name: 'Aluguel abril', type: 'expense', category: 'Moradia', amount: 1800.00, date: '2026-04-03', notes: '', accountId: 'acc-1' },
  { id: 'tx-37', name: 'Salário abril', type: 'income', category: 'Salário', amount: 6500.00, date: '2026-04-01', notes: '', accountId: 'acc-1' },
  { id: 'tx-38', name: 'Renda freelance', type: 'income', category: 'Renda', amount: 1200.00, date: '2026-04-08', notes: '', accountId: 'acc-1' }
];
