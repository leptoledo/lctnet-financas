export * from '@financas/core';

export type ActiveTab = 'dashboard' | 'transactions' | 'accounts' | 'goals' | 'budgets' | 'settings';

export type ActiveModal = 
  | null 
  | 'transaction' 
  | 'whatIf' 
  | 'vampire' 
  | 'goal' 
  | 'settleUp' 
  | 'budgetEdit';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}
