import React, { useState } from 'react';
import { X, Target, TrendingUp } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency } from '@financas/core';

export const GoalModal: React.FC = () => {
  const { activeModal, closeModal, addGoal } = useFinanceStore();

  if (activeModal !== 'goal') return null;

  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState<string>('10000');
  const [currentAmount, setCurrentAmount] = useState<string>('2000');
  const [deadline, setDeadline] = useState('2027-12-31');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');

  const target = parseFloat(targetAmount) || 0;
  const current = parseFloat(currentAmount) || 0;
  const contribution = parseFloat(monthlyContribution) || 0;

  // Cálculo simples de meses restantes com CDI
  const remaining = Math.max(0, target - current);
  const monthsNeeded = contribution > 0 ? Math.ceil(remaining / (contribution * 1.008)) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || target <= 0) {
      alert('Informe um nome e um valor alvo válido.');
      return;
    }

    addGoal({
      name: name.trim(),
      targetAmount: target,
      currentAmount: current,
      deadline,
      colorHex: '#10B981',
      iconName: 'target',
      isCompleted: false,
      createdAt: new Date().toISOString().split('T')[0]
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="glass-modal w-full max-w-lg p-6 space-y-5 border-emerald-500/20 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Nova Meta & Simulador CDI</h3>
              <p className="text-xs text-gray-400">Planeje seus aportes e o rendimento composto</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 mb-1 font-medium">Nome do Objetivo</label>
            <input
              type="text"
              placeholder="Ex: Viagem Japão, Reserva de Emergência..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Valor Alvo (R$)</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-medium">Já Guardado (R$)</label>
              <input
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Data Alvo Limite</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-medium">Aporte Mensal Previsto</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Projeção CDI Box */}
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>Projeção Inteligente (100% do CDI)</span>
            </div>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Com aportes de {formatCurrency(contribution)}/mês e rendimento a 100% do CDI (~0,85% a.m.), você atingirá os {formatCurrency(target)} em aproximadamente <strong>{monthsNeeded} meses</strong>.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/25 transition-all btn-spring text-xs"
          >
            Salvar e Iniciar Meta
          </button>
        </form>
      </div>
    </div>
  );
};
