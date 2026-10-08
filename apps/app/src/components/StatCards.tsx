import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, calculateTimeToEarn } from '@financas/core';

export const StatCards: React.FC = () => {
  const { 
    totalNetWorth, 
    currentMonthIncome, 
    currentMonthExpense, 
    currentMonthBalance,
    privacyShield,
    userProfile
  } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  // Cálculo das Horas de Vida correspondentes ao gasto do mês
  const lifeTime = calculateTimeToEarn(currentMonthExpense, {
    isEnabled: true,
    monthlyIncome: userProfile.monthlyIncome,
    weeklyWorkHours: userProfile.weeklyHours,
    workDaysPerWeek: 5
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Patrimônio Líquido Total */}
      <div className="stat-card-balance p-5 shadow-xl relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-100 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-blue-200" />
            Patrimônio Líquido Consolidado
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded-full text-white">
            Geral
          </span>
        </div>
        <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2">
          {mask(totalNetWorth)}
        </div>
        <div className="flex items-center text-xs text-blue-100/90 gap-1.5">
          <span>Saldo do mês:</span>
          <span className={`font-semibold ${currentMonthBalance >= 0 ? 'text-emerald-200' : 'text-rose-200'}`}>
            {privacyShield ? '••••' : (currentMonthBalance >= 0 ? `+${formatCurrency(currentMonthBalance)}` : formatCurrency(currentMonthBalance))}
          </span>
        </div>
      </div>

      {/* Card 2: Receitas do Mês */}
      <div className="glass-card p-5 border-white/5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Receitas do Mês
          </span>
          <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="text-2xl font-bold tracking-tight text-white mb-2">
          {mask(currentMonthIncome)}
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1.5">
          <span className="text-emerald-400 font-medium">Entradas confirmadas</span>
          <span>no período</span>
        </div>
      </div>

      {/* Card 3: Despesas do Mês + Horas de Vida */}
      <div className="glass-card p-5 border-white/5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-rose-400" />
            Despesas do Mês
          </span>
          <span className="p-1 rounded-lg bg-rose-500/10 text-rose-400">
            <ArrowDownRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="text-2xl font-bold tracking-tight text-white mb-2">
          {mask(currentMonthExpense)}
        </div>
        <div className="text-xs text-amber-300/90 flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 w-fit">
          <Clock className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate">
            {privacyShield ? '•••• horas de vida' : `Equivale a ${lifeTime.formattedString}`}
          </span>
        </div>
      </div>
    </div>
  );
};
