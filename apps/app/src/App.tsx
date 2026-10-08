import React from 'react';
import { FinanceProvider, useFinanceStore } from './store/useFinanceStore';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileDock } from './components/MobileDock';

import { DashboardView } from './views/DashboardView';
import { TransactionsView } from './views/TransactionsView';
import { AccountsView } from './views/AccountsView';
import { GoalsView } from './views/GoalsView';
import { BudgetsView } from './views/BudgetsView';
import { SettingsView } from './views/SettingsView';

import { TransactionModal } from './modals/TransactionModal';
import { WhatIfModal } from './modals/WhatIfModal';
import { VampireDetectorModal } from './modals/VampireDetectorModal';
import { GoalModal } from './modals/GoalModal';
import { SettleUpModal } from './modals/SettleUpModal';

const AppContent: React.FC = () => {
  const { activeTab } = useFinanceStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'transactions':
        return <TransactionsView />;
      case 'accounts':
        return <AccountsView />;
      case 'goals':
        return <GoalsView />;
      case 'budgets':
        return <BudgetsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Body Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic View Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0 max-w-5xl">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Dock */}
      <MobileDock />

      {/* Global Modals */}
      <TransactionModal />
      <WhatIfModal />
      <VampireDetectorModal />
      <GoalModal />
      <SettleUpModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
};

export default App;
