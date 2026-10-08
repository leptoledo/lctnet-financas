import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Trash2, 
  Edit3, 
  CreditCard,
  Tag
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency, formatDate, Transaction } from '@financas/core';

export const TransactionsView: React.FC = () => {
  const { 
    transactions, 
    accounts, 
    categories, 
    deleteTransaction, 
    openModal, 
    privacyShield 
  } = useFinanceStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');

  const mask = (val: number) => (privacyShield ? '••••••' : formatCurrency(val));

  // Filtro dinâmico
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchType = selectedType === 'all' || tx.type === selectedType;
      const matchCategory = selectedCategory === 'all' || tx.category === selectedCategory;
      const matchAccount = selectedAccount === 'all' || tx.accountId === selectedAccount;

      return matchSearch && matchType && matchCategory && matchAccount;
    });
  }, [transactions, searchTerm, selectedType, selectedCategory, selectedAccount]);

  // Totais do filtro
  const totalFiltered = useMemo(() => {
    return filteredTransactions.reduce((acc, tx) => {
      return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
    }, 0);
  }, [filteredTransactions]);

  const getAccountName = (accId: string) => {
    const acc = accounts.find((a) => a.id === accId);
    return acc ? acc.name : 'Conta Padrão';
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header com Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Extrato de Transações</h2>
          <p className="text-xs text-gray-400">
            {filteredTransactions.length} lançamentos encontrados • Saldo líquido filtrado: {mask(totalFiltered)}
          </p>
        </div>

        <button
          onClick={() => openModal('transaction')}
          className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all btn-spring border border-blue-400/20"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Transação</span>
        </button>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="glass-card p-4 border-white/5 space-y-3">
        {/* Input de Busca */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por descrição, comércio ou notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        {/* Linha de Filtros Dropdowns e Tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Tipo de Transação */}
          <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedType === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedType('income')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedType === 'income' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Receitas
            </button>
            <button
              onClick={() => setSelectedType('expense')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedType === 'expense' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Despesas
            </button>
          </div>

          {/* Categoria */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50"
          >
            <option value="all" className="bg-gray-900">Todas as Categorias</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name} className="bg-gray-900">
                {c.name}
              </option>
            ))}
          </select>

          {/* Conta */}
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50"
          >
            <option value="all" className="bg-gray-900">Todas as Contas</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id} className="bg-gray-900">
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="glass-card border-white/5 overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-400">
            Nenhuma transação corresponde aos critérios de pesquisa.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredTransactions.map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <div
                  key={tx.id}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isIncome
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-100 truncate">
                          {tx.name}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                        <span className="inline-flex items-center gap-1">
                          <Tag className="w-3 h-3 text-gray-400" />
                          {tx.category}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <CreditCard className="w-3 h-3 text-gray-400" />
                          {getAccountName(tx.accountId)}
                        </span>
                        <span>•</span>
                        <span>{formatDate(tx.date)}</span>
                        {tx.notes && (
                          <>
                            <span>•</span>
                            <span className="italic text-gray-400 truncate max-w-[150px]">{tx.notes}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-sm font-bold ${
                        isIncome ? 'text-emerald-400' : 'text-gray-100'
                      }`}
                    >
                      {isIncome ? `+${mask(tx.amount)}` : `-${mask(tx.amount)}`}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal('transaction', tx)}
                        title="Editar lançamento"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors btn-spring"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        title="Excluir lançamento"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors btn-spring"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
