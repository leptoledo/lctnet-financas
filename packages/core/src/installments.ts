import { InstallmentGroup } from './types';

export const DEFAULT_INSTALLMENTS: InstallmentGroup[] = [
  {
    id: 'inst-1',
    baseName: 'Notebook Dell Inspiron',
    totalAmount: 3800.00,
    installmentAmount: 380.00,
    paidCount: 7,
    totalCount: 10,
    frequency: 'monthly',
    firstDueDate: '2025-11-15',
    nextDueDate: '2026-06-15',
    category: 'Educação',
    accountId: 'acc-3',
    isFullyPaid: false
  },
  {
    id: 'inst-2',
    baseName: 'Tênis Nike Air Max',
    totalAmount: 399.00,
    installmentAmount: 133.00,
    paidCount: 1,
    totalCount: 3,
    frequency: 'monthly',
    firstDueDate: '2026-05-16',
    nextDueDate: '2026-06-16',
    category: 'Vestuário',
    accountId: 'acc-3',
    isFullyPaid: false
  },
  {
    id: 'inst-3',
    baseName: 'Curso de Especialização Swift & Cloud',
    totalAmount: 1182.00,
    installmentAmount: 197.00,
    paidCount: 3,
    totalCount: 6,
    frequency: 'monthly',
    firstDueDate: '2026-03-10',
    nextDueDate: '2026-06-10',
    category: 'Educação',
    accountId: 'acc-1',
    isFullyPaid: false
  }
];

export function calculateInstallmentSummary(item: InstallmentGroup) {
  const paidAmount = item.installmentAmount * item.paidCount;
  const remainingAmount = Math.max(0, item.totalAmount - paidAmount);
  const remainingCount = Math.max(0, item.totalCount - item.paidCount);
  const progressPercent = item.totalCount > 0 ? (item.paidCount / item.totalCount) * 100 : 0;
  const isFullyPaid = item.paidCount >= item.totalCount || remainingAmount <= 0;

  return {
    paidAmount,
    remainingAmount,
    remainingCount,
    progressPercent,
    isFullyPaid
  };
}
