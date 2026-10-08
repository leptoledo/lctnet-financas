import React from 'react';
import { Users, ArrowRightLeft } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency } from '@financas/core';

export const SharedFinancesCard: React.FC = () => {
  const { sharedBalance, sharedSpace, openModal, privacyShield } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  const isPartnerOwes = sharedBalance.status === 'partnerOwesMe';
  const isIOwe = sharedBalance.status === 'iOwePartner';
  const isSettled = sharedBalance.status === 'settled';

  return (
    <div className="glass-card p-5 border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight">Modo Casal & Divisão</h2>
            <p className="text-xs text-gray-400">Espaço: {sharedSpace.name} com {sharedSpace.partnerName}</p>
          </div>
        </div>

        <button
          onClick={() => openModal('settleUp')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md shadow-pink-500/20 transition-all btn-spring"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Fazer Acerto</span>
        </button>
      </div>

      {/* Box de Status do Balanço */}
      <div
        className={`p-3.5 rounded-2xl border flex items-center justify-between ${
          isPartnerOwes
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
            : isIOwe
            ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
            : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
        }`}
      >
        <div>
          <span className="text-xs font-semibold block">{sharedBalance.statusMessage}</span>
          <span className="text-[11px] opacity-80">
            {isSettled
              ? 'Todas as contas compartilhadas estão equilibradas.'
              : 'Saldo líquido resultante das despesas divididas e acertos Pix.'}
          </span>
        </div>
        <div className="text-base font-bold">
          {mask(sharedBalance.outstandingAmount)}
        </div>
      </div>

      {/* Grid de Totais */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
          <span className="text-gray-400 block text-[11px]">Total Pago por Você</span>
          <span className="font-semibold text-white">{mask(sharedBalance.totalPaidByMe)}</span>
        </div>
        <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
          <span className="text-gray-400 block text-[11px]">Total Pago por {sharedSpace.partnerName}</span>
          <span className="font-semibold text-white">{mask(sharedBalance.totalPaidByPartner)}</span>
        </div>
      </div>
    </div>
  );
};
