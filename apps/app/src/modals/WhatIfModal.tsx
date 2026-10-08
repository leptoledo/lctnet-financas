import React, { useState } from 'react';
import { X, Sparkles, TrendingUp, Clock, Target } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { WhatIfEngine, formatCurrency } from '@financas/core';

export const WhatIfModal: React.FC = () => {
  const { activeModal, closeModal, goals, userProfile, spendingPace } = useFinanceStore();

  if (activeModal !== 'whatIf') return null;

  const [amount, setAmount] = useState<number>(200);
  const [isRecurring, setIsRecurring] = useState<boolean>(true);
  const [cdiRate, setCdiRate] = useState<number>(10.5); // Taxa CDI Brasil atual ~10.5%

  const analysis = WhatIfEngine.analyze(
    amount,
    isRecurring,
    goals,
    userProfile.monthlyIncome,
    spendingPace.spentSoFar,
    spendingPace.totalBudgetLimit,
    spendingPace.daysRemaining,
    cdiRate
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-modal w-full max-w-xl p-6 space-y-5 border-purple-500/20 text-white relative my-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Simulador "Efeito Borboleta"
              </h3>
              <p className="text-xs text-gray-400">Impacto sistêmico de gastos e custo de oportunidade</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controles da Simulação */}
        <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Valor do Gasto (R$)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-bold text-base focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-medium">Taxa Anual do CDI (% a.a.)</label>
              <input
                type="number"
                step="0.1"
                value={cdiRate}
                onChange={(e) => setCdiRate(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-semibold text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-gray-300">Esse gasto se repete todo mês?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecurring(false)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  !isRecurring ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Gasto Único
              </button>
              <button
                type="button"
                onClick={() => setIsRecurring(true)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isRecurring ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Recorrente Mensal
              </button>
            </div>
          </div>
        </div>

        {/* Diagnóstico Preditivo */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
              <span>{analysis.impactEmoji}</span>
              Gravidade do Efeito: {analysis.impactLevelLabel}
            </span>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {analysis.lifeTimeFormatted}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">{analysis.headlineAdvice}</h4>
          <p className="text-xs text-gray-300 leading-relaxed">{analysis.detailedAdvice}</p>
        </div>

        {/* Projeção de Juros Compostos (Custo de Oportunidade) */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Se você poupasse e investisse a {cdiRate}% a.a.:
          </h4>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[11px] text-gray-400 block mb-1">Em 1 Ano</span>
              <span className="text-sm font-bold text-white block">
                {formatCurrency(analysis.opportunityCost.oneYearValue)}
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[11px] text-gray-400 block mb-1">Em 5 Anos</span>
              <span className="text-sm font-bold text-emerald-400 block">
                {formatCurrency(analysis.opportunityCost.fiveYearsValue)}
              </span>
            </div>

            <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-500/20">
              <span className="text-[11px] text-purple-300 block mb-1">Em 10 Anos</span>
              <span className="text-sm font-bold text-purple-300 block">
                {formatCurrency(analysis.opportunityCost.tenYearsValue)}
              </span>
            </div>
          </div>
        </div>

        {/* Impacto na Meta */}
        {analysis.goalImpact && (
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">
                Meta '{analysis.goalImpact.goalName}':
              </span>
            </div>
            <span className="font-semibold text-emerald-400">
              Acelera em {analysis.goalImpact.daysAcceleratedIfSaved} dias se poupar
            </span>
          </div>
        )}

        <button
          onClick={closeModal}
          className="w-full py-2.5 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25 transition-all btn-spring text-xs"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
