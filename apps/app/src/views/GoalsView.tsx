import React from 'react';
import { Target, TrendingUp, Plus } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, formatDate } from '@financas/core';

export const GoalsView: React.FC = () => {
  const { goals, openModal, privacyShield } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Metas de Poupança & CDI</h2>
          <p className="text-xs text-gray-400">
            Acompanhe o progresso dos seus objetivos e simule o poder dos juros compostos.
          </p>
        </div>

        <button
          onClick={() => openModal('goal')}
          className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all btn-spring border border-emerald-400/20"
        >
          <Plus className="w-4 h-4" />
          <span>Simulador & Nova Meta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

          return (
            <div key={goal.id} className="glass-card p-5 border-white/5 space-y-4 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: goal.colorHex + '25', border: `1px solid ${goal.colorHex}50` }}
                  >
                    <Target className="w-5 h-5" style={{ color: goal.colorHex }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {goal.name}
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      {goal.deadline ? `Prazo: ${formatDate(goal.deadline)}` : 'Sem prazo fixo'}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {progress}%
                </span>
              </div>

              {/* Valores */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Acumulado:</span>
                  <span className="font-bold text-white">{mask(goal.currentAmount)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Objetivo Total:</span>
                  <span className="font-semibold text-gray-300">{mask(goal.targetAmount)}</span>
                </div>

                {/* Barra de Progresso */}
                <div className="pt-1.5">
                  <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Indicador CDI */}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">Rendimento a 100% do CDI</span>
                </div>
                <span className="text-[11px] text-gray-300">Falta {mask(remaining)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
