import React from 'react';
import { Eye, EyeOff, Sun, Moon, Plus, Calendar, ShieldCheck } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';

export const Header: React.FC = () => {
  const {
    userProfile,
    privacyShield,
    togglePrivacyShield,
    theme,
    toggleTheme,
    referenceMonth,
    setReferenceMonth,
    openModal
  } = useFinanceStore();

  const firstName = userProfile.name.split(' ')[0] || 'Usuário';

  const monthOptions = [
    { value: '2026-05', label: 'Maio de 2026' },
    { value: '2026-04', label: 'Abril de 2026' },
    { value: '2026-03', label: 'Março de 2026' }
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
          F
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-white tracking-tight">Olá, {firstName}</h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" /> PRO
            </span>
          </div>
          <p className="text-xs text-gray-400">Visão Financeira em Tempo Real</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Seletor de Período */}
        <div className="relative flex items-center bg-gray-800/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-gray-200">
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
          <select
            value={referenceMonth}
            onChange={(e) => setReferenceMonth(e.target.value)}
            className="bg-transparent border-none text-xs font-medium text-gray-200 focus:outline-none cursor-pointer pr-1"
          >
            {monthOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-gray-900 text-gray-100">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Escudo de Privacidade */}
        <button
          onClick={togglePrivacyShield}
          title={privacyShield ? 'Desativar Escudo de Privacidade' : 'Ativar Escudo de Privacidade'}
          className={`p-2 rounded-xl transition-all btn-spring border ${
            privacyShield
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-md shadow-amber-500/10'
              : 'bg-gray-800/60 border-white/10 text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          {privacyShield ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>

        {/* Alternador de Tema */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          className="p-2 rounded-xl bg-gray-800/60 border border-white/10 text-gray-300 hover:text-white hover:bg-gray-800 transition-all btn-spring"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Botão Nova Transação Desktop */}
        <button
          onClick={() => openModal('transaction')}
          className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-blue-500/25 transition-all btn-spring border border-blue-400/20"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Transação</span>
        </button>
      </div>
    </header>
  );
};
