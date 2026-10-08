import React from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, formatDate } from '@financas/core';

export const UpcomingBillsCard: React.FC = () => {
  const { recurring, addTransaction, privacyShield } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  // Ordena compromissos ativos próximos
  const upcomingBills = recurring
    .filter((r) => r.isActive && r.type === 'expense')
    .sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime())
    .slice(0, 4);

  const handlePayBill = (bill: typeof upcomingBills[0]) => {
    addTransaction({
      name: bill.name,
      amount: bill.amount,
      type: 'expense',
      category: bill.category,
      date: new Date().toISOString().split('T')[0],
      accountId: bill.accountId,
      notes: `Pagamento agendado: ${bill.notes || ''}`
    });
  };

  const getDueBadge = (dueDateStr: string) => {
    const today = new Date('2026-05-19');
    const due = new Date(dueDateStr);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (diffDays < 0) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
          <AlertCircle className="w-3 h-3" /> Vencida
        </span>
      );
    } else if (diffDays === 0) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
          <Clock className="w-3 h-3" /> Vence Hoje
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
          <Calendar className="w-3 h-3" /> Em {diffDays} dias
        </span>
      );
    }
  };

  return (
    <div className="glass-card p-5 border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight">Contas a Vencer</h2>
            <p className="text-xs text-gray-400">Próximos pagamentos recorrentes</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {upcomingBills.length === 0 ? (
          <p className="py-4 text-xs text-gray-400 text-center">Nenhum compromisso pendente no momento.</p>
        ) : (
          upcomingBills.map((bill) => (
            <div key={bill.id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-xs font-semibold text-gray-200 truncate">{bill.name}</h4>
                  {getDueBadge(bill.nextDueDate)}
                </div>
                <p className="text-[11px] text-gray-400">
                  {bill.category} • Vencimento: {formatDate(bill.nextDueDate)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-white">{mask(bill.amount)}</span>
                <button
                  onClick={() => handlePayBill(bill)}
                  title="Marcar como paga e registrar"
                  className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all btn-spring"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
