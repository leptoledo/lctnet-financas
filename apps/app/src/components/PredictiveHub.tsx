import React from 'react';
import { Sparkles, Zap, Target, ArrowRight } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency } from '@financas/core';

export const PredictiveHub: React.FC = () => {
  const { openModal, vampireReport, privacyShield } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Motores de Inteligência Financeira
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Efeito Borboleta (What-If) */}
        <div
          onClick={() => openModal('whatIf')}
          className="glass-card p-4 border-purple-500/20 hover:border-purple-500/40 cursor-pointer group transition-all btn-spring bg-gradient-to-br from-purple-950/20 to-transparent"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              Preditivo
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
            Efeito Borboleta
          </h4>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            Simule o impacto a longo prazo de qualquer gasto a 100% do CDI em 1, 5 e 10 anos.
          </p>
          <div className="flex items-center gap-1 text-xs text-purple-400 font-medium mt-3">
            <span>Simular decisão</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Detector Vampiro */}
        <div
          onClick={() => openModal('vampire')}
          className="glass-card p-4 border-rose-500/20 hover:border-rose-500/40 cursor-pointer group transition-all btn-spring bg-gradient-to-br from-rose-950/20 to-transparent"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              Nota {vampireReport.vampireHealthGrade}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition-colors">
            Detector Vampiro
          </h4>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            Dreno anual de {mask(vampireReport.totalAnnualDrain)} em assinaturas e aumentos silenciosos.
          </p>
          <div className="flex items-center gap-1 text-xs text-rose-400 font-medium mt-3">
            <span>Auditar assinaturas</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Metas com CDI */}
        <div
          onClick={() => openModal('goal')}
          className="glass-card p-4 border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer group transition-all btn-spring bg-gradient-to-br from-emerald-950/20 to-transparent"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Rendimento
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
            Metas & Juros Compostos
          </h4>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            Projete aportes mensais com rendimento líquido de 100% do CDI até a data limite.
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium mt-3">
            <span>Abrir simulador</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
