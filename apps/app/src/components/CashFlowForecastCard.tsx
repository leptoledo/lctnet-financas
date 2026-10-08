import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, formatDate } from '@financas/core';

export const CashFlowForecastCard: React.FC = () => {
  const { cashFlowForecast, privacyShield } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  const isCritical = cashFlowForecast.overallSeverity === 'critical';
  const isWarning = cashFlowForecast.overallSeverity === 'warning';

  return (
    <div className="glass-card p-5 border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-xl border ${
              isCritical
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                : isWarning
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {isCritical ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight">Previsão de Caixa (30 Dias)</h2>
            <p className="text-xs text-gray-400">Algoritmo Preditivo Anti-Descoberto</p>
          </div>
        </div>

        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
            isCritical
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              : isWarning
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}
        >
          {isCritical ? 'Risco Detectado' : isWarning ? 'Atenção' : 'Protegido'}
        </span>
      </div>

      <p className="text-xs text-gray-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
        {cashFlowForecast.headlineAdvice}
      </p>

      {/* Menor saldo projetado */}
      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
        <span className="text-gray-400">Ponto mais baixo da reserva:</span>
        <div className="text-right">
          <span className="font-bold text-white block">{mask(cashFlowForecast.lowestProjectedBalance)}</span>
          {cashFlowForecast.lowestBalanceDate && (
            <span className="text-[10px] text-gray-400">em {formatDate(cashFlowForecast.lowestBalanceDate)}</span>
          )}
        </div>
      </div>

      {/* Alertas específicos de resgate preventivo */}
      {cashFlowForecast.alerts.length > 0 && (
        <div className="space-y-2 pt-1">
          {cashFlowForecast.alerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-semibold text-rose-300">
                <span>Risco em {alert.accountName}</span>
                <span>Déficit: {mask(alert.projectedDeficit)}</span>
              </div>
              <p className="text-[11px] text-rose-200/80">{alert.causeDescription}</p>
              {alert.suggestedRescueAccountName && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium pt-1">
                  <span>Sugestão: Transferir {mask(alert.suggestedTransferAmount)} de {alert.suggestedRescueAccountName}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
