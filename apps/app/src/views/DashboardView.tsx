import React from 'react';
import { StatCards } from '../components/StatCards';
import { SpendingPaceCard } from '../components/SpendingPaceCard';
import { UpcomingBillsCard } from '../components/UpcomingBillsCard';
import { CashFlowForecastCard } from '../components/CashFlowForecastCard';
import { SharedFinancesCard } from '../components/SharedFinancesCard';
import { PredictiveHub } from '../components/PredictiveHub';
import { DonutChart } from '../components/Charts/DonutChart';
import { TrendChart } from '../components/Charts/TrendChart';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, formatDate } from '@financas/core';
import { ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { transactions, setActiveTab, privacyShield, referenceMonth } = useFinanceStore();

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  // Últimas 5 transações
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 1. Indicadores Financeiros de Alto Nível */}
      <StatCards />

      {/* 2. Ritmo de Gastos (Burn Rate) */}
      <SpendingPaceCard />

      {/* 3. Previsão de Caixa & Contas a Vencer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CashFlowForecastCard />
        <UpcomingBillsCard />
      </div>

      {/* 4. Modo Casal & Finanças Compartilhadas */}
      <SharedFinancesCard />

      {/* 5. Gráficos Analíticos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DonutChart />
        <TrendChart />
      </div>

      {/* 6. Motores de Inteligência Artificial Preditiva */}
      <PredictiveHub />

      {/* 7. Extrato Recente Rápido */}
      <div className="glass-card p-5 border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">Últimos Lançamentos</h3>
            <p className="text-xs text-gray-400">Atividades financeiras mais recentes</p>
          </div>
          <button
            onClick={() => setActiveTab('transactions')}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium btn-spring"
          >
            <span>Ver extrato completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {recentTransactions.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <div key={tx.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isIncome
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {isIncome ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-gray-200 truncate">{tx.name}</h4>
                    <p className="text-[11px] text-gray-400">
                      {tx.category} • {formatDate(tx.date)}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xs font-bold ${
                      isIncome ? 'text-emerald-400' : 'text-gray-100'
                    }`}
                  >
                    {isIncome ? `+${mask(tx.amount)}` : `-${mask(tx.amount)}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
