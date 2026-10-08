import React, { useState } from 'react';
import { X, ArrowRightLeft, Users } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatCurrency } from '@financas/core';

export const SettleUpModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    sharedBalance, 
    sharedSpace, 
    addSharedSettlement 
  } = useFinanceStore();

  if (activeModal !== 'settleUp') return null;

  const defaultPayer = sharedBalance.status === 'partnerOwesMe' ? 'partner' : 'me';
  const [payer, setPayer] = useState<'me' | 'partner'>(defaultPayer);
  const [amount, setAmount] = useState<string>(sharedBalance.outstandingAmount.toFixed(2));
  const [notes, setNotes] = useState('Acerto de contas via Pix');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Informe um valor de liquidação válido.');
      return;
    }

    addSharedSettlement({
      spaceId: sharedSpace.id,
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
      payer,
      notes
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="glass-modal w-full max-w-md p-6 space-y-5 border-pink-500/20 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Acerto de Contas (Modo Casal)</h3>
              <p className="text-xs text-gray-400">Liquidação de dívidas e transferências Pix</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-1">
          <span className="text-gray-400 block">Situação Atual:</span>
          <p className="text-sm font-bold text-white">{sharedBalance.statusMessage}</p>
          <span className="text-pink-400 font-semibold block text-base">
            {formatCurrency(sharedBalance.outstandingAmount)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 mb-1 font-medium">Quem realizou o pagamento/Pix?</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPayer('partner')}
                className={`py-2 rounded-xl font-medium transition-all ${
                  payer === 'partner'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {sharedSpace.partnerName} me pagou
              </button>
              <button
                type="button"
                onClick={() => setPayer('me')}
                className={`py-2 rounded-xl font-medium transition-all ${
                  payer === 'me'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                Eu paguei {sharedSpace.partnerName}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1 font-medium">Valor do Acerto (R$)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-base font-bold text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 font-medium">Notas / Comprovante</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-semibold text-white bg-pink-600 hover:bg-pink-500 shadow-lg shadow-pink-500/25 transition-all btn-spring text-xs"
          >
            Confirmar Liquidação
          </button>
        </form>
      </div>
    </div>
  );
};
