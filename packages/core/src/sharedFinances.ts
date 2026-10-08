import { SharedSpace, SharedSettlement, SharedBalanceSummary, SharedBalanceStatus } from './types';

export const DEFAULT_SHARED_SPACE: SharedSpace = {
  id: 'space-1',
  name: 'Casa & Casal',
  partnerName: 'Ana',
  partnerEmail: 'ana@exemplo.com',
  defaultSplitRatio: 0.5,
  inviteCode: 'CASAL50',
  createdAt: '2026-03-01'
};

export interface SharedExpenseItem {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  paidBy: 'me' | 'partner';
  mySplitRatio: number; // ex: 0.5
}

export const DEFAULT_SHARED_EXPENSES: SharedExpenseItem[] = [
  { id: 'se-1', name: 'Supermercado Mensal Pão de Açúcar', amount: 410.80, date: '2026-05-02', category: 'Alimentação', paidBy: 'me', mySplitRatio: 0.5 },
  { id: 'se-2', name: 'Aluguel do Apartamento', amount: 1800.00, date: '2026-05-03', category: 'Moradia', paidBy: 'me', mySplitRatio: 0.5 },
  { id: 'se-3', name: 'Feira Orgânica & Hortifruti', amount: 145.00, date: '2026-05-08', category: 'Alimentação', paidBy: 'partner', mySplitRatio: 0.5 },
  { id: 'se-4', name: 'Conta de Energia Elétrica', amount: 156.40, date: '2026-05-05', category: 'Serviços essenciais', paidBy: 'me', mySplitRatio: 0.5 },
  { id: 'se-5', name: 'Internet Fibra', amount: 99.90, date: '2026-05-13', category: 'Serviços essenciais', paidBy: 'partner', mySplitRatio: 0.5 }
];

export const DEFAULT_SHARED_SETTLEMENTS: SharedSettlement[] = [
  { id: 'set-1', spaceId: 'space-1', amount: 800.00, date: '2026-05-04', payer: 'partner', notes: 'Pix adiantamento do aluguel' }
];

/**
 * Calcula o balanço das finanças compartilhadas.
 * Fiel a UtilitiesSharedFinancesHelper.swift
 */
export function calculateSharedBalance(
  expenses: SharedExpenseItem[] = DEFAULT_SHARED_EXPENSES,
  settlements: SharedSettlement[] = DEFAULT_SHARED_SETTLEMENTS,
  space: SharedSpace = DEFAULT_SHARED_SPACE
): SharedBalanceSummary {
  let totalSharedExpenses = 0;
  let totalPaidByMe = 0;
  let totalPaidByPartner = 0;
  let myTotalShare = 0;
  let partnerTotalShare = 0;

  expenses.forEach(item => {
    totalSharedExpenses += item.amount;
    const myShare = item.amount * item.mySplitRatio;
    const partnerShare = item.amount * (1 - item.mySplitRatio);

    myTotalShare += myShare;
    partnerTotalShare += partnerShare;

    if (item.paidBy === 'me') {
      totalPaidByMe += item.amount;
    } else {
      totalPaidByPartner += item.amount;
    }
  });

  // Liquidações (acertos já feitos via Pix)
  let settlementsPaidByPartner = 0;
  let settlementsPaidByMe = 0;

  settlements.forEach(s => {
    if (s.payer === 'partner') {
      settlementsPaidByPartner += s.amount;
    } else {
      settlementsPaidByMe += s.amount;
    }
  });

  // Saldo Líquido:
  // O que a parceira deve pelo consumo das contas pagas por mim
  // menos o que eu devo pelo consumo das contas pagas por ela
  // ajustado pelas transferências de acerto
  const grossPartnerOwes = totalPaidByMe - myTotalShare;
  const grossIOwe = totalPaidByPartner - partnerTotalShare;

  const netBalance = (grossPartnerOwes - grossIOwe) - settlementsPaidByPartner + settlementsPaidByMe;

  let status: SharedBalanceStatus = 'settled';
  let statusMessage = 'Tudo em dia! Nenhuma dívida pendente.';

  if (netBalance > 0.5) {
    status = 'partnerOwesMe';
    statusMessage = `${space.partnerName} deve a você`;
  } else if (netBalance < -0.5) {
    status = 'iOwePartner';
    statusMessage = `Você deve a ${space.partnerName}`;
  }

  return {
    totalSharedExpenses,
    totalPaidByMe,
    totalPaidByPartner,
    myTotalShare,
    partnerTotalShare,
    netBalance,
    status,
    statusMessage,
    partnerName: space.partnerName,
    outstandingAmount: Math.abs(netBalance)
  };
}
