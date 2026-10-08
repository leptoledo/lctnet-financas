/**
 * @financas/core - Cálculos Financeiros
 */

import {
  Transaction,
  Category,
  Account,
  CategoryExpenseSummary,
  BalanceSummary,
  MonthlyTrendPoint,
  TimePeriod
} from './types';

export function filterTransactionsByPeriod(
  transactions: Transaction[],
  period: TimePeriod,
  referenceDate: Date = new Date('2026-05-19')
): Transaction[] {
  if (period === 'all') return transactions;

  return transactions.filter(t => {
    const txDate = new Date(t.date);
    if (period === 'week') {
      const diffTime = referenceDate.getTime() - txDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
      return diffDays >= 0 && diffDays <= 7;
    }
    if (period === 'month') {
      return (
        txDate.getMonth() === referenceDate.getMonth() &&
        txDate.getFullYear() === referenceDate.getFullYear()
      );
    }
    if (period === 'year') {
      return txDate.getFullYear() === referenceDate.getFullYear();
    }
    return true;
  });
}

export function calculateBalanceSummary(transactions: Transaction[]): BalanceSummary {
  let income = 0;
  let expense = 0;

  for (const t of transactions) {
    if (t.type === 'income') {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  }

  return {
    income,
    expense,
    balance: income - expense
  };
}

export function calculateExpensesByCategory(
  transactions: Transaction[],
  categories: Category[]
): CategoryExpenseSummary[] {
  const expenseTxs = transactions.filter(t => t.type === 'expense');
  const totals: Record<string, number> = {};
  let totalExpense = 0;

  for (const t of expenseTxs) {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
    totalExpense += t.amount;
  }

  const result: CategoryExpenseSummary[] = Object.keys(totals).map(catName => {
    const catObj = categories.find(c => c.name === catName) || {
      name: catName,
      colorHex: '#64748B',
      iconName: 'tag'
    };
    const amount = totals[catName];
    const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
    return {
      name: catName,
      amount,
      percentage,
      colorHex: catObj.colorHex,
      iconName: catObj.iconName
    };
  });

  return result.sort((a, b) => b.amount - a.amount);
}

export function calculateTotalNetWorth(
  accounts: Account[],
  transactions: Transaction[]
): number {
  return accounts.reduce((accTotal, account) => {
    const accountTxs = transactions.filter(t => t.accountId === account.id);
    const balance = accountTxs.reduce((acc, tx) => {
      return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
    }, account.initialBalance);
    return accTotal + balance;
  }, 0);
}

export function calculateMonthlyTrend(transactions: Transaction[]): MonthlyTrendPoint[] {
  const months = [
    { label: 'Dez', key: '2025-12' },
    { label: 'Jan', key: '2026-01' },
    { label: 'Fev', key: '2026-02' },
    { label: 'Mar', key: '2026-03' },
    { label: 'Abr', key: '2026-04' },
    { label: 'Mai', key: '2026-05' }
  ];

  return months.map(m => {
    let income = 0;
    let expense = 0;
    for (const t of transactions) {
      if (t.date.startsWith(m.key)) {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
      }
    }
    return {
      label: m.label,
      income,
      expense
    };
  });
}
