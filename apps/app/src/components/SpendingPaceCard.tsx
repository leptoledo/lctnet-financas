import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency } from '@financas/core';

export const SpendingPaceCard: React.FC = () => {
  const { spendingPace, privacyShield } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  const isOverspending = spendingPace.paceStatus === 'overspending';
  const isCaution = spendingPace.paceStatus === 'caution';

  const badgeConfig = isOverspending
    ? {
        bg: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
        icon: AlertTriangle,
        label: 'Ritmo Acelerado'
      }
    : isCaution
    ? {
        bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
        icon: Activity,
        label: 'Atenção'
      }
    : {
        bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
        icon: CheckCircle,
        label: 'No Ritmo Ideal'
      };

  const BadgeIcon = badgeConfig.icon;

  // Progresso do mês em dias
  const monthDayPercent = Math.min(100, Math.round((spendingPace.currentDay / spendingPace.daysInMonth) * 100));
  // Progresso do orçamento gasto
  const budgetSpentPercent = Math.min(100, Math.round(spendingPace.percentageUsed));

  return (
    <div className="glass-card p-5 border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight">Ritmo de Gastos (Burn Rate)</h2>
            <p className="text-xs text-gray-400">Dia {spendingPace.currentDay} de {spendingPace.daysInMonth} ({spendingPace.daysRemaining} dias restantes)</p>
          </div>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeConfig.bg}`}>
          <BadgeIcon className="w-3.5 h-3.5" />
          <span>{badgeConfig.label}</span>
        </div>
      </div>

      {/* Barra de Progresso Comparativa */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Gasto Real: <strong className="text-gray-200">{mask(spendingPace.spentSoFar)}</strong></span>
          <span>Teto do Mês: <strong className="text-gray-200">{mask(spendingPace.totalBudgetLimit)}</strong></span>
        </div>
        <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverspending ? 'bg-rose-500' : isCaution ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${budgetSpentPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>{budgetSpentPercent}% do teto consumido</span>
          <span>Tempo decorrido: {monthDayPercent}% do mês</span>
        </div>
      </div>

      {/* Grid de Métricas do Ritmo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
        <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
          <span className="text-[11px] text-gray-400 block">Ritmo Diário Real</span>
          <span className="text-sm font-semibold text-white">{mask(spendingPace.dailyBurnRate)}/dia</span>
        </div>

        <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
          <span className="text-[11px] text-gray-400 block">Ritmo Diário Ideal</span>
          <span className="text-sm font-semibold text-emerald-400">{mask(spendingPace.idealDailyBurnRate)}/dia</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
          <span className="text-[11px] text-gray-400 block">Projeção Fim do Mês</span>
          <span className={`text-sm font-semibold ${isOverspending ? 'text-rose-400' : 'text-gray-200'}`}>
            {mask(spendingPace.projectedMonthEnd)}
          </span>
        </div>
      </div>
    </div>
  );
};
