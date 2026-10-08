import React from 'react';
import { X, Zap, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency } from '@financas/core';

export const VampireDetectorModal: React.FC = () => {
  const { activeModal, closeModal, vampireReport, privacyShield } = useFinanceStore();

  if (activeModal !== 'vampire') return null;

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  const isCritical = vampireReport.vampireHealthGrade === 'D' || vampireReport.vampireHealthGrade === 'C';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-modal w-full max-w-xl p-6 space-y-5 border-rose-500/20 text-white relative my-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Detector de Assinaturas Vampiro & Inflação
              </h3>
              <p className="text-xs text-gray-400">Auditoria de drenos recorrentes e aumento silencioso de preço</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumo da Saúde Financeira */}
        <div
          className={`p-4 rounded-2xl border space-y-2.5 ${
            isCritical
              ? 'bg-rose-950/30 border-rose-500/30 text-rose-300'
              : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              {isCritical ? <ShieldAlert className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              Diagnóstico de Assinaturas
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
              Nota {vampireReport.vampireHealthGrade}
            </span>
          </div>
          <p className="text-xs text-gray-200 leading-relaxed">{vampireReport.adviceSummary}</p>
        </div>

        {/* Estatísticas de Dreno */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block mb-1">Dreno Mensal</span>
            <span className="text-sm font-bold text-rose-400 block">
              {mask(vampireReport.totalMonthlyDrain)}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block mb-1">Dreno Anual</span>
            <span className="text-sm font-bold text-rose-400 block">
              {mask(vampireReport.totalAnnualDrain)}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block mb-1">Trabalho Gasto</span>
            <span className="text-sm font-bold text-amber-400 block">
              {vampireReport.annualWorkingDaysDrained} dias/ano
            </span>
          </div>
        </div>

        {/* Lista de Assinaturas Detectadas */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Assinaturas Detectadas ({vampireReport.subscriptions.length})
          </h4>

          <div className="divide-y divide-white/5 max-h-56 overflow-y-auto pr-1">
            {vampireReport.subscriptions.map((sub) => (
              <div key={sub.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-200">{sub.name}</span>
                    {sub.priceHike && (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                        +{sub.priceHike.percentIncrease}% aumento
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {sub.categoryName} • {mask(sub.annualCost)}/ano
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{mask(sub.monthlyCost)}/mês</span>
                  {sub.cancellationUrlString && (
                    <a
                      href={sub.cancellationUrlString}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                      title="Link direto para gerenciar ou cancelar"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={closeModal}
          className="w-full py-2.5 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/25 transition-all btn-spring text-xs"
        >
          Concluir Auditoria
        </button>
      </div>
    </div>
  );
};
