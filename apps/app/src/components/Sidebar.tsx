import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  CreditCard, 
  Target, 
  PieChart, 
  Settings,
  Sparkles,
  Zap,
  Users
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { ActiveTab } from '../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, openModal } = useFinanceStore();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transações', icon: ArrowLeftRight },
    { id: 'accounts', label: 'Contas & Cartões', icon: CreditCard },
    { id: 'goals', label: 'Metas CDI', icon: Target },
    { id: 'budgets', label: 'Orçamentos', icon: PieChart },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#0B0F19]/90 backdrop-blur-2xl p-4 shrink-0 min-h-[calc(100vh-61px)]">
      {/* Menu principal */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu Principal</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all btn-spring ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Atalhos de IA & Ferramentas Inteligentes */}
      <div className="mt-8 space-y-1.5">
        <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Inteligência Financeira</p>
        
        <button
          onClick={() => openModal('whatIf')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-purple-300 bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/20 transition-all btn-spring"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Efeito Borboleta</span>
          </div>
          <span className="text-[10px] bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-300">Simulador</span>
        </button>

        <button
          onClick={() => openModal('vampire')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/20 transition-all btn-spring"
        >
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-rose-400" />
            <span>Detector Vampiro</span>
          </div>
          <span className="text-[10px] bg-rose-500/20 px-1.5 py-0.5 rounded text-rose-300">Auditoria</span>
        </button>

        <button
          onClick={() => openModal('settleUp')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/20 transition-all btn-spring"
        >
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Modo Casal Acerto</span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">Pix</span>
        </button>
      </div>

      {/* Cartão de Ajuda / Monorepo Footer */}
      <div className="mt-auto pt-6">
        <div className="rounded-2xl p-3.5 bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/5 text-xs text-gray-400">
          <div className="flex items-center gap-1.5 text-gray-200 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Finanças Engine v2.0
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            TypeScript + Vite Monorepo integrado com algoritmos iOS.
          </p>
        </div>
      </div>
    </aside>
  );
};
