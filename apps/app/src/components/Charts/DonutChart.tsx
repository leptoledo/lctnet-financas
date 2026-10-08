import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useFinanceStore } from '../../store/useFinanceStore';
import { calculateExpensesByCategory } from '@financas/core';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DonutChart: React.FC = () => {
  const { transactions, categories, referenceMonth } = useFinanceStore();

  const currentMonthExpenses = transactions.filter(
    (t) => t.type === 'expense' && t.date.startsWith(referenceMonth)
  );

  const categoryData = calculateExpensesByCategory(currentMonthExpenses, categories);

  if (categoryData.length === 0) {
    return (
      <div className="glass-card p-5 border-white/5 flex flex-col items-center justify-center min-h-[260px] text-gray-400 text-xs">
        Nenhuma despesa registrada para este mês.
      </div>
    );
  }

  const chartData = {
    labels: categoryData.map((c) => c.name),
    datasets: [
      {
        data: categoryData.map((c) => c.amount),
        backgroundColor: categoryData.map((c) => c.colorHex),
        borderColor: '#0B0F19',
        borderWidth: 2,
        hoverOffset: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#9CA3AF',
          font: { size: 11 },
          boxWidth: 12,
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: '#111827',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#F9FAFB',
        bodyColor: '#D1D5DB',
        callbacks: {
          label: (context: any) => {
            const val = context.raw || 0;
            return ` R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
          }
        }
      }
    },
    cutout: '72%'
  };

  return (
    <div className="glass-card p-5 border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white tracking-tight">Despesas por Categoria</h3>
        <span className="text-xs text-gray-400">{categoryData.length} categorias ativas</span>
      </div>
      <div className="h-[230px] relative flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};
