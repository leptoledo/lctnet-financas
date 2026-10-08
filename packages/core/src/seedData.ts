/**
 * @financas/core - Dados Padrão e Seed Data
 */

import { Category, Account, SavingGoal, Budget, Transaction } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Alimentação', iconName: 'utensils', colorHex: '#F59E0B' },
  { id: 'cat-2', name: 'Moradia', iconName: 'home', colorHex: '#3B82F6' },
  { id: 'cat-3', name: 'Transporte', iconName: 'car', colorHex: '#10B981' },
  { id: 'cat-4', name: 'Saúde', iconName: 'heart-pulse', colorHex: '#EF4444' },
  { id: 'cat-5', name: 'Educação', iconName: 'graduation-cap', colorHex: '#8B5CF6' },
  { id: 'cat-6', name: 'Lazer', iconName: 'film', colorHex: '#EC4899' },
  { id: 'cat-7', name: 'Serviços essenciais', iconName: 'zap', colorHex: '#6366F1' },
  { id: 'cat-8', name: 'Salário', iconName: 'briefcase', colorHex: '#059669' },
  { id: 'cat-9', name: 'Renda', iconName: 'dollar-sign', colorHex: '#10B981' },
  { id: 'cat-10', name: 'Rendimentos', iconName: 'trending-up', colorHex: '#14B8A6' },
  { id: 'cat-11', name: 'Vestuário', iconName: 'shirt', colorHex: '#D946EF' },
  { id: 'cat-12', name: 'Seguros', iconName: 'shield-check', colorHex: '#0284C7' },
  { id: 'cat-13', name: 'Crédito', iconName: 'credit-card', colorHex: '#DC2626' },
  { id: 'cat-14', name: 'Outros', iconName: 'tag', colorHex: '#64748B' }
];

export const DEFAULT_ACCOUNTS: Account[] = [
  { id: 'acc-1', name: 'Nubank Principal', type: 'Conta Corrente', initialBalance: 2450.00, colorHex: '#8B5CF6', iconName: 'building-columns' },
  { id: 'acc-2', name: 'CDB Reserva', type: 'Investimento', initialBalance: 15800.00, colorHex: '#10B981', iconName: 'trending-up' },
  { id: 'acc-3', name: 'Cartão Black', type: 'Cartão de Crédito', initialBalance: 0.00, colorHex: '#1E293B', iconName: 'credit-card' },
  { id: 'acc-4', name: 'Carteira Dinheiro', type: 'Dinheiro', initialBalance: 250.00, colorHex: '#F59E0B', iconName: 'wallet' }
];

export const DEFAULT_GOALS: SavingGoal[] = [
  { id: 'goal-1', name: 'Reserva de Emergência', targetAmount: 25000, currentAmount: 16500, deadline: '2026-12-31', colorHex: '#10B981', iconName: 'shield-check', isCompleted: false, createdAt: '2026-01-10' },
  { id: 'goal-2', name: 'Viagem para a Europa', targetAmount: 18000, currentAmount: 7200, deadline: '2027-04-15', colorHex: '#3B82F6', iconName: 'plane', isCompleted: false, createdAt: '2026-02-15' },
  { id: 'goal-3', name: 'Troca de Carro', targetAmount: 45000, currentAmount: 12000, deadline: '2027-10-30', colorHex: '#8B5CF6', iconName: 'car', isCompleted: false, createdAt: '2026-03-01' }
];

export const DEFAULT_BUDGETS: Budget[] = [
  { id: 'bud-1', category: 'Alimentação', limit: 1400.00, month: 5, year: 2026 },
  { id: 'bud-2', category: 'Moradia', limit: 2500.00, month: 5, year: 2026 },
  { id: 'bud-3', category: 'Transporte', limit: 600.00, month: 5, year: 2026 },
  { id: 'bud-4', category: 'Lazer', limit: 500.00, month: 5, year: 2026 },
  { id: 'bud-5', category: 'Serviços essenciais', limit: 600.00, month: 5, year: 2026 }
];

export const DEFAULT_RECURRING_TRANSACTIONS = [
  { id: 'rec-1', name: 'Aluguel do Apartamento', amount: 1800.00, type: 'expense' as const, category: 'Moradia', accountId: 'acc-1', frequency: 'monthly' as const, nextDueDate: '2026-05-06', isActive: true, notes: 'Vencimento dia 6' },
  { id: 'rec-2', name: 'Condomínio', amount: 450.00, type: 'expense' as const, category: 'Moradia', accountId: 'acc-1', frequency: 'monthly' as const, nextDueDate: '2026-05-10', isActive: true, notes: 'Boleto bancário' },
  { id: 'rec-3', name: 'Internet Fibra 600MB', amount: 99.90, type: 'expense' as const, category: 'Serviços essenciais', accountId: 'acc-1', frequency: 'monthly' as const, nextDueDate: '2026-05-13', isActive: true, notes: 'Débito automático' },
  { id: 'rec-4', name: 'Netflix Premium', amount: 55.90, type: 'expense' as const, category: 'Lazer', accountId: 'acc-3', frequency: 'monthly' as const, nextDueDate: '2026-05-12', isActive: true, notes: 'Cartão Black' },
  { id: 'rec-5', name: 'Spotify Família', amount: 21.90, type: 'expense' as const, category: 'Lazer', accountId: 'acc-3', frequency: 'monthly' as const, nextDueDate: '2026-05-14', isActive: true, notes: 'Cartão Black' },
  { id: 'rec-6', name: 'Academia SmartFit', amount: 99.90, type: 'expense' as const, category: 'Saúde', accountId: 'acc-1', frequency: 'monthly' as const, nextDueDate: '2026-05-07', isActive: true, notes: 'Mensalidade' },
  { id: 'rec-7', name: 'Salário Mensal', amount: 6500.00, type: 'income' as const, category: 'Salário', accountId: 'acc-1', frequency: 'monthly' as const, nextDueDate: '2026-06-01', isActive: true, notes: 'Depósito em conta' }
];


export function parseCSVTransactions(csvText: string): Transaction[] {
  const lines = csvText.trim().split('\n');
  const result: Transaction[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(',');
    if (parts.length < 5) continue;

    const [dStr, name, type, category, valStr, notes] = parts;
    const [day, month, year] = dStr.split('/');
    const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    result.push({
      id: 'tx-' + (i).toString(),
      name: name.trim(),
      type: type.trim() === 'Receita' ? 'income' : 'expense',
      category: category.trim(),
      amount: parseFloat(valStr) || 0,
      date: isoDate,
      notes: (notes || '').trim(),
      accountId: 'acc-1'
    });
  }

  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
