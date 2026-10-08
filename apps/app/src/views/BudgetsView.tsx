import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Edit2, Check } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, Budget } from '@financas/core';

export const BudgetsView: React.FC = () => {
  const { 
    budgets, 
    transactions, 
    referenceMonth, 
    updateBudget, 
    privacyShield 
  } = useFinanceStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLimit, setNewLimit] = useState<number>(0);

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  // Cálculo de gastos por categoria no mês de referência
  const getCategorySpent = (categoryName: string) => {
    return transactions
      .filter((t) => t.type === 'expense' && t.category === categoryName && t.date.startsWith(referenceMonth))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const handleStartEdit = (b: Budget) => {
    setEditingId(b.id);
    setNewLimit(b.limit);
  };

  const handleSaveEdit = (b: Budget) => {
    updateBudget({ ...b, limit: Number(newLimit) || b.limit });
    setEditingId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Tetos Orçamentários</h2>
        <p className="text-xs text-gray-400">
          Controle de limites mensais por categoria de despesa para manter o orçamento equilibrado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b) => {
          const spent = getCategorySpent(b.category);
          const percent = b.limit > 0 ? Math.min(100, Math.round((spent / b.limit) * 100)) : 0;
          const isExceeded = spent > b.limit;
          const isWarning = spent > b.limit * 0.8 && !isExceeded;

          const isEditing = editingId === b.id;

          return (
            <div key={b.id} className="glass-card p-5 border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{b.category}</h3>
                  <span className="text-[11px] text-gray-400">Teto mensal de gastos</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isExceeded ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                      <AlertTriangle className="w-3 h-3" /> Estourado
                    </span>
                  ) : isWarning ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      Atenção
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> Seguro
                    </span>
                  )}
                </div>
              </div>

              {/* Valores */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Gasto até agora:</span>
                  <span className={`font-bold ${isExceeded ? 'text-rose-400' : 'text-white'}`}>
                    {mask(spent)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Teto estipulado:</span>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={newLimit}
                        onChange={(e) => setNewLimit(Number(e.target.value))}
                        className="w-24 bg-white/10 border border-blue-500 rounded px-1.5 py-0.5 text-xs text-white"
                      />
                      <button
                        onClick={() => handleSaveEdit(b)}
                        className="p-1 rounded bg-blue-600 text-white"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-200">{mask(b.limit)}</span>
                      <button
                        onClick={() => handleStartEdit(b)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Barra de Progresso */}
                <div className="pt-2">
                  <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isExceeded ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-gray-400 pt-1 border-t border-white/5">
                <span>{percent}% utilizado</span>
                <span>
                  {isExceeded
                    ? `Ultrapassado em ${mask(spent - b.limit)}`
                    : `Disponível: ${mask(b.limit - spent)}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
