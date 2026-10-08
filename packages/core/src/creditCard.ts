import { Transaction, CreditCardConfig, CreditCardInvoice, InvoiceStatus } from './types';

export const DEFAULT_CREDIT_CARD_CONFIG: CreditCardConfig = {
  accountId: 'acc-3', // Cartão Black
  creditLimit: 15000.00,
  closingDay: 25,
  dueDay: 5
};

/**
 * Retorna o melhor dia de compra (dia seguinte ao fechamento da fatura).
 * Garante até 40 dias de prazo para pagamento.
 */
export function getBestDayToBuy(closingDay: number = 25): number {
  return closingDay === 31 ? 1 : closingDay + 1;
}

/**
 * Determina o mês e ano da fatura para uma determinada data de compra.
 * Fiel a UtilitiesCreditCardHelper.swift
 */
export function getInvoiceMonthYear(
  txDateStr: string,
  closingDay: number = 25
): { month: number; year: number } {
  const [yStr, mStr, dStr] = txDateStr.split('-');
  let year = parseInt(yStr);
  let month = parseInt(mStr);
  const day = parseInt(dStr);

  if (day <= closingDay) {
    return { month, year };
  } else {
    if (month === 12) {
      return { month: 1, year: year + 1 };
    } else {
      return { month: month + 1, year };
    }
  }
}

/**
 * Constrói as faturas agrupadas do cartão de crédito.
 */
export function calculateCreditCardInvoices(
  transactions: Transaction[],
  config: CreditCardConfig = DEFAULT_CREDIT_CARD_CONFIG,
  referenceDate: Date = new Date('2026-05-19')
): CreditCardInvoice[] {
  const cardTxs = transactions.filter(t => t.accountId === config.accountId && t.type === 'expense');
  const invoicesMap: { [key: string]: Transaction[] } = {};

  cardTxs.forEach(t => {
    const { month, year } = getInvoiceMonthYear(t.date, config.closingDay);
    const key = `${year}-${String(month).padStart(2, '0')}`;
    if (!invoicesMap[key]) invoicesMap[key] = [];
    invoicesMap[key].push(t);
  });

  // Garantir a fatura atual (2026-05)
  const currentKey = '2026-05';
  if (!invoicesMap[currentKey]) invoicesMap[currentKey] = [];

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const result: CreditCardInvoice[] = Object.keys(invoicesMap).map(key => {
    const [yStr, mStr] = key.split('-');
    const year = parseInt(yStr);
    const month = parseInt(mStr);
    const txs = invoicesMap[key];
    const totalAmount = txs.reduce((sum, t) => sum + t.amount, 0);

    const closingDate = `${year}-${String(month).padStart(2, '0')}-${String(config.closingDay).padStart(2, '0')}`;
    const dueMonth = config.dueDay < config.closingDay ? (month === 12 ? 1 : month + 1) : month;
    const dueYear = (config.dueDay < config.closingDay && month === 12) ? year + 1 : year;
    const dueDate = `${dueYear}-${String(dueMonth).padStart(2, '0')}-${String(config.dueDay).padStart(2, '0')}`;

    let status: InvoiceStatus = 'open';
    const refStr = referenceDate.toISOString().split('T')[0];

    if (refStr > dueDate) {
      status = 'closed';
    } else if (refStr > closingDate) {
      status = 'closed';
    } else {
      status = 'open';
    }

    const bestDay = getBestDayToBuy(config.closingDay);
    const bestDayToBuy = `Dia ${bestDay}`;

    return {
      id: key,
      month,
      year,
      monthTitle: `${monthNames[month - 1]} de ${year}`,
      startDate: `${year}-${String(month === 1 ? 12 : month - 1).padStart(2, '0')}-${String(getBestDayToBuy(config.closingDay)).padStart(2, '0')}`,
      closingDate,
      dueDate,
      status,
      totalAmount,
      transactions: txs,
      bestDayToBuy
    };
  });

  return result.sort((a, b) => b.id.localeCompare(a.id));
}
