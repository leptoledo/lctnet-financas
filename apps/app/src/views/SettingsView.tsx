import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { calculateHourlyRate } from '@financas/core';

export const SettingsView: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    resetToDefaults, 
    transactions, 
    accounts, 
    goals, 
    budgets 
  } = useFinanceStore();

  const [name, setName] = useState(userProfile.name);
  const [monthlyIncome, setMonthlyIncome] = useState(userProfile.monthlyIncome);
  const [weeklyHours, setWeeklyHours] = useState(userProfile.weeklyHours);
  const [partnerName, setPartnerName] = useState(userProfile.partnerName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Valor da hora de trabalho
  const hourlyRate = calculateHourlyRate({
    isEnabled: true,
    monthlyIncome,
    weeklyWorkHours: weeklyHours,
    workDaysPerWeek: 5
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      monthlyIncome: Number(monthlyIncome),
      weeklyHours: Number(weeklyHours),
      partnerName
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportJSON = () => {
    const backup = {
      transactions,
      accounts,
      goals,
      budgets,
      userProfile,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financas-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.transactions && data.accounts) {
          localStorage.setItem('@financas:v2:data', JSON.stringify(data));
          window.location.reload();
        } else {
          alert('Arquivo de backup inválido.');
        }
      } catch (err) {
        alert('Erro ao processar arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar os dados para a versão padrão de demonstração?')) {
      resetToDefaults();
      alert('Dados restaurados com sucesso.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Configurações & Perfil</h2>
        <p className="text-xs text-gray-400">
          Personalize seu perfil financeiro, taxa horária de trabalho e parâmetros do app.
        </p>
      </div>

      {/* Formulário de Perfil */}
      <form onSubmit={handleSaveProfile} className="glass-card p-5 border-white/5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          Dados Pessoais & Motor "Horas de Vida"
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">Seu Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Nome do(a) Parceiro(a) (Modo Casal)</label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Renda Líquida Mensal (R$)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Horas Semanais de Trabalho</label>
            <input
              type="number"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Indicador de Taxa Horária */}
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Sua hora de trabalho vale aproximadamente:</span>
          </div>
          <span className="font-bold text-white text-sm">
            R$ {hourlyRate.toFixed(2)}/hora
          </span>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition-all btn-spring"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : null}
          <span>{savedSuccess ? 'Salvo com sucesso!' : 'Salvar Alterações'}</span>
        </button>
      </form>

      {/* Backup e Gestão de Dados */}
      <div className="glass-card p-5 border-white/5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Segurança, Backup e Portabilidade
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition-all btn-spring"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Exportar Backup Completo (JSON)</span>
          </button>

          <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 cursor-pointer transition-all btn-spring">
            <Upload className="w-4 h-4 text-purple-400" />
            <span>Importar Backup (JSON)</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>

        <div className="pt-3 border-t border-white/5">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors btn-spring"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar dados para o padrão de demonstração</span>
          </button>
        </div>
      </div>
    </div>
  );
};
