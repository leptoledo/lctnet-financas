import React, { useState } from 'react';
import { X, ArrowUpRight, ArrowDownRight, CreditCard, Users } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { TransactionType } from '@financas/core';

export const TransactionModal: React.FC = () => {
  const { 
    activeModal, 
    modalPayload, 
    closeModal, 
    addTransaction, 
    updateTransaction, 
    accounts, 
    categories,
    sharedSpace,
    addSharedExpense
  } = useFinanceStore();

  if (activeModal !== 'transaction') return null;

  const isEditing = !!modalPayload?.id;

  const [type, setType] = useState<TransactionType>(modalPayload?.type || 'expense');
  const [name, setName] = useState(modalPayload?.name || '');
  const [amount, setAmount] = useState<string>(modalPayload?.amount?.toString() || '');
  const [date, setDate] = useState(modalPayload?.date || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(modalPayload?.category || 'Alimentação');
  const [accountId, setAccountId] = useState(modalPayload?.accountId || accounts[0]?.id || 'acc-1');
  const [notes, setNotes] = useState(modalPayload?.notes || '');

  // Opções avançadas
  const [isInstallment, setIsInstallment] = useState(false);
  const [installmentCount, setInstallmentCount] = useState<number>(3);
  const [isShared, setIsShared] = useState(false);
  const [splitRatio, setSplitRatio] = useState<number>(50); // 50%

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!name.trim() || isNaN(numAmount) || numAmount <= 0) {
      alert('Por favor, informe uma descrição válida e um valor maior que zero.');
      return;
    }

    if (isEditing) {
      updateTransaction({
        ...modalPayload,
        type,
        name: name.trim(),
        amount: numAmount,
        date,
        category,
        accountId,
        notes: notes.trim()
      });
    } else {
      // Se for parcelado, pode adicionar indicador no nome
      const txName = isInstallment ? `${name.trim()} (1/${installmentCount})` : name.trim();

      addTransaction({
        type,
        name: txName,
        amount: numAmount,
        date,
        category,
        accountId,
        notes: notes.trim()
      });

      // Se for dividido no casal, registra também na finança compartilhada
      if (isShared && type === 'expense') {
        addSharedExpense({
          name: name.trim(),
          amount: numAmount,
          date,
          category,
          paidBy: 'me',
          mySplitRatio: splitRatio / 100
        });
      }
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="glass-modal w-full max-w-lg p-6 space-y-5 border-white/10 text-white relative">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">
            {isEditing ? 'Editar Transação' : 'Nova Transação'}
          </h3>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Seletor Tipo: Receita / Despesa */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl font-semibold transition-all ${
                type === 'expense'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>Despesa</span>
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl font-semibold transition-all ${
                type === 'income'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Receita</span>
            </button>
          </div>

          {/* Valor */}
          <div>
            <label className="block text-gray-400 mb-1 font-medium">Valor (R$)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">R$</span>
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-base font-bold text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-gray-400 mb-1 font-medium">Descrição</label>
            <input
              type="text"
              placeholder="Ex: Supermercado, Almoço, Freelance..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>

          {/* Categoria e Conta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name} className="bg-gray-900">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-medium">Conta / Cartão</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id} className="bg-gray-900">
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Data */}
          <div>
            <label className="block text-gray-400 mb-1 font-medium">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>

          {/* Opções Avançadas: Parcelamento & Modo Casal (apenas na criação) */}
          {!isEditing && type === 'expense' && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              {/* Checkbox Parcelado */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Compra Parcelada no Cartão?</span>
                </div>
                <input
                  type="checkbox"
                  checked={isInstallment}
                  onChange={(e) => setIsInstallment(e.target.checked)}
                  className="rounded bg-gray-800 border-white/20 text-purple-600 focus:ring-0 w-4 h-4"
                />
              </div>

              {isInstallment && (
                <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl">
                  <label className="block text-purple-300 mb-1">Número de Parcelas</label>
                  <select
                    value={installmentCount}
                    onChange={(e) => setInstallmentCount(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-purple-500/30 rounded-lg p-1.5 text-white"
                  >
                    {[2, 3, 4, 5, 6, 10, 12, 18, 24].map((num) => (
                      <option key={num} value={num}>
                        {num}x de R$ {(parseFloat(amount || '0') / num || 0).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Checkbox Dividir Casal */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-300">Dividir no Modo Casal ({sharedSpace.partnerName})?</span>
                </div>
                <input
                  type="checkbox"
                  checked={isShared}
                  onChange={(e) => setIsShared(e.target.checked)}
                  className="rounded bg-gray-800 border-white/20 text-pink-600 focus:ring-0 w-4 h-4"
                />
              </div>

              {isShared && (
                <div className="p-3 bg-pink-950/20 border border-pink-500/20 rounded-xl flex items-center justify-between">
                  <span className="text-pink-300">Sua parte: {splitRatio}% (R$ {(parseFloat(amount || '0') * (splitRatio / 100) || 0).toFixed(2)})</span>
                  <span className="text-pink-300">{sharedSpace.partnerName}: {100 - splitRatio}%</span>
                </div>
              )}
            </div>
          )}

          {/* Botão de Salvar */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all btn-spring"
            >
              {isEditing ? 'Atualizar Lançamento' : 'Confirmar e Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
