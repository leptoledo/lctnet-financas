import React from 'react';
import { LayoutDashboard, ArrowLeftRight, Plus, Target, Settings } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { ActiveTab } from '../types';

export const MobileDock: React.FC = () => {
  const { activeTab, setActiveTab, openModal } = useFinanceStore();

  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'transactions', label: 'Extrato', icon: ArrowLeftRight },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0F19]/90 backdrop-blur-2xl border-t border-white/10 px-4 py-2 flex items-center justify-around safe-area-bottom shadow-2xl">
      {/* Primeiras 2 abas */}
      {tabs.slice(0, 2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all btn-spring ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}

      {/* Botão Central Flutuante (+) */}
      <button
        onClick={() => openModal('transaction')}
        className="-mt-6 w-14 h-14 p-3.5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-xl shadow-blue-500/35 border-2 border-[#0B0F19] hover:scale-105 active:scale-95 transition-all flex items-center justify-center btn-spring"
        title="Adicionar Transação"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Próximas 2 abas */}
      {tabs.slice(2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all btn-spring ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
