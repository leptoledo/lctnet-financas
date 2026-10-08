import React from 'react';
import { CreditCard, Landmark, Wallet, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, calculateInstallmentSummary } from '@financas/core';

export const AccountsView: React.FC = () => {
  const { 
    accounts, 
    transactions, 
    creditCardInvoices, 
    installments, 
    privacyShield 
  } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  // Cálculo de saldo atual por conta
  const getAccountCurrentBalance = (accId: string, initial: number) => {
    const accTxs = transactions.filter((t) => t.accountId === accId);
    return accTxs.reduce((sum, tx) => {
      return tx.type === 'income' ? sum + tx.amount : sum - tx.amount;
    }, initial);
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'Conta Corrente':
        return Landmark;
      case 'Investimento':
        return TrendingUp;
      case 'Cartão de Crédito':
        return CreditCard;
      default:
        return Wallet;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Contas & Cartões</h2>
        <p className="text-xs text-gray-400">
          Gerenciamento bancário integrado, limite de crédito e controle de parcelas.
        </p>
      </div>

      {/* 1. Destaque: Cartão de Crédito Black */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 p-6 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">FINANÇAS BLACK</span>
            <span className="text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full border border-white/10">TITANIUM</span>
          </div>
          <Sparkles className="w-5 h-5 text-amber-400/80" />
        </div>

        <div className="space-y-1 mb-8">
          <span className="text-xs text-neutral-400 uppercase tracking-wider block">Fatura Atual (Maio)</span>
          <div className="text-3xl font-extrabold tracking-tight text-white">
            {mask(creditCardInvoices[0]?.totalAmount || 0)}
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
            <span>Limite Disponível: <strong className="text-neutral-200">{mask(15000 - (creditCardInvoices[0]?.totalAmount || 0))}</strong></span>
            <span>•</span>
            <span>Limite Total: {mask(15000)}</span>
          </div>
        </div>

        {/* Informações Inteligentes de Compra */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <span className="text-neutral-400 block text-[11px] mb-0.5">Melhor Dia de Compra</span>
            <span className="font-semibold text-emerald-400 text-sm">
              {creditCardInvoices[0]?.bestDayToBuy || 'Dia 26'}
            </span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">Até 40 dias para pagar</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <span className="text-neutral-400 block text-[11px] mb-0.5">Fechamento da Fatura</span>
            <span className="font-semibold text-amber-400 text-sm">Todo dia 25</span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">Trava lançamentos do mês</span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <span className="text-neutral-400 block text-[11px] mb-0.5">Vencimento</span>
            <span className="font-semibold text-blue-400 text-sm">Todo dia 05</span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">Débito automático ou Pix</span>
          </div>
        </div>
      </div>

      {/* 2. Grid de Contas Bancárias e Investimentos */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white tracking-tight">Contas Bancárias & Liquidez</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map((acc) => {
            const Icon = getAccountIcon(acc.type);
            const currentBal = getAccountCurrentBalance(acc.id, acc.initialBalance);
            return (
              <div key={acc.id} className="glass-card p-5 border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: acc.colorHex + '25', border: `1px solid ${acc.colorHex}50` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: acc.colorHex }} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{acc.name}</h4>
                      <p className="text-[11px] text-gray-400">{acc.type}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block">Saldo Atual</span>
                  <div className="text-xl font-bold text-white tracking-tight">
                    {mask(currentBal)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Parcelamentos Ativos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white tracking-tight">Compras Parceladas Ativas</h3>
          </div>
          <span className="text-xs text-gray-400">{installments.length} compras no cartão</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {installments.map((item) => {
            const summary = calculateInstallmentSummary(item);
            return (
              <div key={item.id} className="glass-card p-4 border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white truncate">{item.baseName}</h4>
                  <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    {item.paidCount}/{item.totalCount}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Parcela: <strong className="text-gray-200">{mask(item.installmentAmount)}/mês</strong></span>
                    <span>Restante: <strong className="text-gray-200">{mask(summary.remainingAmount)}</strong></span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: `${summary.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-white/5">
                  <span>Próx. vencimento:</span>
                  <span className="text-gray-300 font-medium">{item.nextDueDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
