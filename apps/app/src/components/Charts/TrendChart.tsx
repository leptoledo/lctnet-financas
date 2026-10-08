import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useFinanceStore } from '../../store/useFinanceStore';
import { calculateMonthlyTrend } from '@financas/core';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const TrendChart: React.FC = () => {
  const { transactions } = useFinanceStore();

  const trendData = calculateMonthlyTrend(transactions);

  const chartData = {
    labels: trendData.map((d) => d.label),
    datasets: [
      {
        label: 'Receitas',
        data: trendData.map((d) => d.income),
        backgroundColor: '#10B981',
        borderRadius: 6
      },
      {
        label: 'Despesas',
        data: trendData.map((d) => d.expense),
        backgroundColor: '#EF4444',
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF',
          font: { size: 11 },
          boxWidth: 12
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
            return ` ${context.dataset.label}: R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { size: 10 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: {
          color: '#6B7280',
          font: { size: 10 },
          callback: (value: any) => `R$ ${value / 1000}k`
        }
      }
    }
  };

  return (
    <div className="glass-card p-5 border-white/5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white tracking-tight">Evolução Mensal (Receitas vs Despesas)</h3>
        <span className="text-xs text-gray-400">Últimos 6 meses</span>
      </div>
      <div className="h-[230px] relative">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
