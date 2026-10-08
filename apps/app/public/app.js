/**
 * Finanças - Aplicação Multiplataforma (Web & Android)
 * Arquitetura de Estado Reativo & Integração Supabase
 * Bloco 1: Inteligência & Dashboard (Spending Pace, Upcoming Bills, Time to Earn, Privacy Shield)
 */

// --- 1. SEED DATA COMPLETO (Extraído do seed.csv do app iOS) ---
const RAW_SEED_CSV = `Data,Nome,Tipo,Categoria,Valor,Notas
01/03/2026,Salário março,Receita,Salário,6500.00,
03/03/2026,Supermercado Extra,Despesa,Alimentação,320.50,Compra mensal
05/03/2026,Uber trabalho,Despesa,Transporte,38.90,
06/03/2026,Aluguel março,Despesa,Moradia,1800.00,
07/03/2026,Plano de saúde,Despesa,Saúde,320.00,
08/03/2026,Farmácia,Despesa,Saúde,87.40,Vitaminas e suplementos
10/03/2026,Curso Swift,Despesa,Educação,197.00,
12/03/2026,Conta de luz,Despesa,Serviços essenciais,145.30,
12/03/2026,Conta de água,Despesa,Serviços essenciais,62.80,
13/03/2026,Netflix,Despesa,Lazer,55.90,
14/03/2026,Spotify,Despesa,Lazer,21.90,
15/03/2026,iFood Sábado,Despesa,Alimentação,72.00,Jantar em família
17/03/2026,Camiseta Reserva,Despesa,Vestuário,159.00,
18/03/2026,Seguro carro,Despesa,Seguros,210.00,
19/03/2026,Internet,Despesa,Serviços essenciais,99.90,
20/03/2026,Rendimentos CDB,Receita,Rendimentos,230.00,CDB Nubank
21/03/2026,Gasolina,Despesa,Transporte,180.00,
22/03/2026,Presente aniversário,Despesa,Presente,150.00,Presente para Ana
25/03/2026,Reembolso viagem,Receita,Reembolso,350.00,Empresa reembolsou viagem
26/03/2026,Restaurante almoço,Despesa,Alimentação,64.00,Almoço com cliente
28/03/2026,Academia,Despesa,Saúde,99.90,
29/03/2026,Padaria,Despesa,Alimentação,28.50,
31/03/2026,Cartão crédito fatura,Despesa,Crédito,420.00,Fatura março
01/04/2026,Salário abril,Receita,Salário,6500.00,
02/04/2026,Supermercado Pão de Açúcar,Despesa,Alimentação,410.80,Compra quinzenal
03/04/2026,Aluguel abril,Despesa,Moradia,1800.00,
04/04/2026,99 corrida,Despesa,Transporte,29.70,
05/04/2026,Dentista,Despesa,Saúde,280.00,Limpeza e consulta
07/04/2026,Livros programação,Despesa,Educação,89.90,Livro Clean Architecture
08/04/2026,Renda freelance,Receita,Renda,1200.00,Projeto app iOS
10/04/2026,Conta de luz,Despesa,Serviços essenciais,138.60,
10/04/2026,Condomínio,Despesa,Moradia,450.00,
12/04/2026,Netflix,Despesa,Lazer,55.90,
12/04/2026,Spotify,Despesa,Lazer,21.90,
13/04/2026,Calça jeans,Despesa,Vestuário,219.00,
14/04/2026,Gasolina,Despesa,Transporte,165.00,
15/04/2026,iFood almoço,Despesa,Alimentação,45.00,
16/04/2026,Transferência para poupança,Despesa,Transferências,500.00,Reserva mensal
17/04/2026,Seguro vida,Despesa,Seguros,85.00,
19/04/2026,Farmácia,Despesa,Saúde,43.20,
20/04/2026,Rendimentos poupança,Receita,Rendimentos,45.00,
21/04/2026,Empréstimo parcela,Despesa,Empréstimo,380.00,Parcela 6/24
22/04/2026,Restaurante jantar,Despesa,Alimentação,118.00,Aniversário
24/04/2026,Internet,Despesa,Serviços essenciais,99.90,
25/04/2026,Cinema,Despesa,Lazer,80.00,Família
26/04/2026,Doação ONG,Despesa,Doação,100.00,Ação Social
28/04/2026,Mesada filho,Despesa,Mesada para crianças,200.00,
30/04/2026,Cartão crédito fatura,Despesa,Crédito,680.00,Fatura abril
01/05/2026,Salário maio,Receita,Salário,6500.00,
02/05/2026,Supermercado Extra,Despesa,Alimentação,378.20,
03/05/2026,Aluguel maio,Despesa,Moradia,1800.00,
05/05/2026,Conta de luz,Despesa,Serviços essenciais,156.40,
05/05/2026,Conta de água,Despesa,Serviços essenciais,71.00,
06/05/2026,Gasolina,Despesa,Transporte,190.00,
07/05/2026,Academia,Despesa,Saúde,99.90,
08/05/2026,Netflix,Despesa,Lazer,55.90,
08/05/2026,Spotify,Despesa,Lazer,21.90,
09/05/2026,Curso design,Despesa,Educação,249.00,Curso UX/UI
10/05/2026,Renda freelance,Receita,Renda,800.00,Consultoria
11/05/2026,iFood jantar,Despesa,Alimentação,92.00,
12/05/2026,Seguro carro,Despesa,Seguros,210.00,
13/05/2026,Internet,Despesa,Serviços essenciais,99.90,
14/05/2026,Farmácia,Despesa,Saúde,61.50,
15/05/2026,Venda notebook usado,Receita,Vendas líquidas,1800.00,Notebook antigo OLX
15/05/2026,Empréstimo parcela,Despesa,Empréstimo,380.00,Parcela 7/24
16/05/2026,Tenis Nike,Despesa,Vestuário,399.00,
17/05/2026,Presente Dia das Mães,Despesa,Presente,280.00,
18/05/2026,Rendimentos CDB,Receita,Rendimentos,310.00,
19/05/2026,Almoço restaurante,Despesa,Alimentação,58.00,
19/05/2026,Condomínio,Despesa,Moradia,450.00,`;

// --- 2. MODELOS E CORES PADRÃO ---
const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Alimentação', icon: 'utensils', color: '#F59E0B' },
  { id: 'cat-2', name: 'Moradia', icon: 'home', color: '#3B82F6' },
  { id: 'cat-3', name: 'Transporte', icon: 'car', color: '#10B981' },
  { id: 'cat-4', name: 'Saúde', icon: 'heart-pulse', color: '#EF4444' },
  { id: 'cat-5', name: 'Educação', icon: 'graduation-cap', color: '#8B5CF6' },
  { id: 'cat-6', name: 'Lazer', icon: 'film', color: '#EC4899' },
  { id: 'cat-7', name: 'Serviços essenciais', icon: 'zap', color: '#6366F1' },
  { id: 'cat-8', name: 'Salário', icon: 'briefcase', color: '#059669' },
  { id: 'cat-9', name: 'Renda', icon: 'dollar-sign', color: '#10B981' },
  { id: 'cat-10', name: 'Rendimentos', icon: 'trending-up', color: '#14B8A6' },
  { id: 'cat-11', name: 'Vestuário', icon: 'shirt', color: '#D946EF' },
  { id: 'cat-12', name: 'Seguros', icon: 'shield-check', color: '#0284C7' },
  { id: 'cat-13', name: 'Crédito', icon: 'credit-card', color: '#DC2626' },
  { id: 'cat-14', name: 'Outros', icon: 'tag', color: '#64748B' }
];

const DEFAULT_ACCOUNTS = [
  { id: 'acc-1', name: 'Nubank Principal', type: 'Conta Corrente', initialBalance: 2450.00, color: '#8B5CF6', icon: 'building-columns' },
  { id: 'acc-2', name: 'CDB Reserva', type: 'Investimento', initialBalance: 15800.00, color: '#10B981', icon: 'trending-up' },
  { id: 'acc-3', name: 'Cartão Black', type: 'Cartão de Crédito', initialBalance: 0.00, color: '#1E293B', icon: 'credit-card' },
  { id: 'acc-4', name: 'Carteira Dinheiro', type: 'Dinheiro', initialBalance: 250.00, color: '#F59E0B', icon: 'wallet' }
];

const DEFAULT_GOALS = [
  { id: 'goal-1', name: 'Reserva de Emergência', targetAmount: 25000, currentAmount: 16500, deadline: '2026-12-31', color: '#10B981', icon: 'shield-check' },
  { id: 'goal-2', name: 'Viagem para a Europa', targetAmount: 18000, currentAmount: 7200, deadline: '2027-04-15', color: '#3B82F6', icon: 'plane' },
  { id: 'goal-3', name: 'Troca de Carro', targetAmount: 45000, currentAmount: 12000, deadline: '2027-10-30', color: '#8B5CF6', icon: 'car' }
];

const DEFAULT_BUDGETS = [
  { id: 'bud-1', category: 'Alimentação', limit: 1400.00, month: 5, year: 2026 },
  { id: 'bud-2', category: 'Moradia', limit: 2500.00, month: 5, year: 2026 },
  { id: 'bud-3', category: 'Transporte', limit: 600.00, month: 5, year: 2026 },
  { id: 'bud-4', category: 'Lazer', limit: 500.00, month: 5, year: 2026 },
  { id: 'bud-5', category: 'Serviços essenciais', limit: 600.00, month: 5, year: 2026 }
];

const DEFAULT_RECURRING = [
  { id: 'rec-1', name: 'Aluguel do Apartamento', amount: 1800.00, type: 'expense', category: 'Moradia', accountId: 'acc-1', frequency: 'monthly', nextDueDate: '2026-05-23', isActive: true, notes: 'Vencimento dia 23' },
  { id: 'rec-2', name: 'Condomínio', amount: 450.00, type: 'expense', category: 'Moradia', accountId: 'acc-1', frequency: 'monthly', nextDueDate: '2026-05-25', isActive: true, notes: 'Boleto bancário' },
  { id: 'rec-3', name: 'Internet Fibra 600MB', amount: 99.90, type: 'expense', category: 'Serviços essenciais', accountId: 'acc-1', frequency: 'monthly', nextDueDate: '2026-05-24', isActive: true, notes: 'Débito automático' },
  { id: 'rec-4', name: 'Netflix Premium', amount: 55.90, type: 'expense', category: 'Lazer', accountId: 'acc-3', frequency: 'monthly', nextDueDate: '2026-05-22', isActive: true, notes: 'Cartão Black' },
  { id: 'rec-5', name: 'Spotify Família', amount: 21.90, type: 'expense', category: 'Lazer', accountId: 'acc-3', frequency: 'monthly', nextDueDate: '2026-05-26', isActive: true, notes: 'Cartão Black' },
  { id: 'rec-6', name: 'Academia SmartFit', amount: 99.90, type: 'expense', category: 'Saúde', accountId: 'acc-1', frequency: 'monthly', nextDueDate: '2026-05-20', isActive: true, notes: 'Mensalidade' }
];

// Modelos Bloco 2 (Cartões, Parcelamentos e Finanças Compartilhadas)
const DEFAULT_CREDIT_CARD_CONFIG = {
  accountId: 'acc-3',
  creditLimit: 15000.00,
  closingDay: 25,
  dueDay: 5
};

const DEFAULT_INSTALLMENTS = [
  {
    id: 'inst-1',
    baseName: 'Notebook Dell Inspiron',
    totalAmount: 3800.00,
    installmentAmount: 380.00,
    paidCount: 7,
    totalCount: 10,
    frequency: 'monthly',
    firstDueDate: '2025-11-15',
    nextDueDate: '2026-06-15',
    category: 'Educação',
    accountId: 'acc-3',
    isFullyPaid: false
  },
  {
    id: 'inst-2',
    baseName: 'Tênis Nike Air Max',
    totalAmount: 399.00,
    installmentAmount: 133.00,
    paidCount: 1,
    totalCount: 3,
    frequency: 'monthly',
    firstDueDate: '2026-05-16',
    nextDueDate: '2026-06-16',
    category: 'Vestuário',
    accountId: 'acc-3',
    isFullyPaid: false
  },
  {
    id: 'inst-3',
    baseName: 'Curso de Especialização Swift & Cloud',
    totalAmount: 1182.00,
    installmentAmount: 197.00,
    paidCount: 3,
    totalCount: 6,
    frequency: 'monthly',
    firstDueDate: '2026-03-10',
    nextDueDate: '2026-06-10',
    category: 'Educação',
    accountId: 'acc-1',
    isFullyPaid: false
  }
];

const DEFAULT_SHARED_SPACE = {
  id: 'space-1',
  name: 'Casa & Casal',
  partnerName: 'Ana',
  partnerEmail: 'ana@exemplo.com',
  defaultSplitRatio: 0.5,
  inviteCode: 'CASAL50',
  createdAt: '2026-03-01'
};

const DEFAULT_SHARED_EXPENSES = [
  { id: 'se-1', name: 'Supermercado Mensal Pão de Açúcar', amount: 410.80, date: '2026-05-02', category: 'Alimentação', paidBy: 'me', mySplitRatio: 0.5 },
  { id: 'se-2', name: 'Aluguel do Apartamento', amount: 1800.00, date: '2026-05-03', category: 'Moradia', paidBy: 'me', mySplitRatio: 0.5 },
  { id: 'se-3', name: 'Feira Orgânica & Hortifruti', amount: 145.00, date: '2026-05-08', category: 'Alimentação', paidBy: 'partner', mySplitRatio: 0.5 },
  { id: 'se-4', name: 'Conta de Energia Elétrica', amount: 156.40, date: '2026-05-05', category: 'Serviços essenciais', paidBy: 'me', mySplitRatio: 0.5 },
  { id: 'se-5', name: 'Internet Fibra', amount: 99.90, date: '2026-05-13', category: 'Serviços essenciais', paidBy: 'partner', mySplitRatio: 0.5 }
];

const DEFAULT_SHARED_SETTLEMENTS = [
  { id: 'set-1', spaceId: 'space-1', amount: 800.00, date: '2026-05-04', payer: 'partner', notes: 'Pix adiantamento do aluguel' }
];

// --- 3. ESTADO GLOBAL DA APLICAÇÃO ---
class Store {
  constructor() {
    this.currency = localStorage.getItem('financas_currency') || 'BRL';
    this.theme = localStorage.getItem('financas_theme') || 'dark';
    this.activeTab = 'dashboard';
    this.selectedPeriod = 'month'; // 'week', 'month', 'year', 'all'
    this.categories = JSON.parse(localStorage.getItem('financas_categories')) || DEFAULT_CATEGORIES;
    this.accounts = JSON.parse(localStorage.getItem('financas_accounts')) || DEFAULT_ACCOUNTS;
    this.goals = JSON.parse(localStorage.getItem('financas_goals')) || DEFAULT_GOALS;
    this.budgets = JSON.parse(localStorage.getItem('financas_budgets')) || DEFAULT_BUDGETS;
    
    // Novidades Bloco 1:
    this.privacyEnabled = localStorage.getItem('financas_privacy') === 'true';
    this.timeToEarn = JSON.parse(localStorage.getItem('financas_tte')) || {
      isEnabled: true,
      monthlyIncome: 6500,
      weeklyWorkHours: 40,
      workDaysPerWeek: 5
    };
    this.recurring = JSON.parse(localStorage.getItem('financas_recurring')) || DEFAULT_RECURRING;

    // Novidades Bloco 2:
    this.creditCardConfig = JSON.parse(localStorage.getItem('financas_credit_card')) || DEFAULT_CREDIT_CARD_CONFIG;
    this.installments = JSON.parse(localStorage.getItem('financas_installments')) || DEFAULT_INSTALLMENTS;
    this.sharedSpace = JSON.parse(localStorage.getItem('financas_shared_space')) || DEFAULT_SHARED_SPACE;
    this.sharedExpenses = JSON.parse(localStorage.getItem('financas_shared_expenses')) || DEFAULT_SHARED_EXPENSES;
    this.sharedSettlements = JSON.parse(localStorage.getItem('financas_shared_settlements')) || DEFAULT_SHARED_SETTLEMENTS;

    // Transações
    const savedTx = localStorage.getItem('financas_transactions');
    if (savedTx) {
      this.transactions = JSON.parse(savedTx);
    } else {
      this.transactions = this.parseSeedCSV(RAW_SEED_CSV);
      this.saveTransactions();
    }

    // Configuração Supabase
    this.supabaseConfig = {
      url: localStorage.getItem('supabase_url') || 'https://inuboqltymsifipyzrka.supabase.co',
      anonKey: localStorage.getItem('supabase_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludWJvcWx0eW1zaWZpcHl6cmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTgwMTMsImV4cCI6MjA5NDU5NDAxM30.BerRaKYqEDii_5DCC9iTmxePnHuzLqDGFgS1-QHRbS8',
      connected: false
    };

    // User profile
    this.user = {
      fullName: 'Leandro Toledo',
      email: 'leandro@exemplo.com',
      isPro: true
    };
  }

  parseSeedCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split(',');
      if (parts.length < 5) continue;
      
      const [dStr, name, type, category, valStr, notes] = parts;
      const [day, month, year] = dStr.split('/');
      const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      result.push({
        id: 'tx-' + Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        type: type.trim() === 'Receita' ? 'income' : 'expense',
        category: category.trim(),
        amount: parseFloat(valStr) || 0,
        date: isoDate,
        notes: (notes || '').trim(),
        accountId: 'acc-1'
      });
    }
    // Ordenar decrescente por data
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    return result;
  }

  saveTransactions() {
    localStorage.setItem('financas_transactions', JSON.stringify(this.transactions));
  }

  saveAccounts() {
    localStorage.setItem('financas_accounts', JSON.stringify(this.accounts));
  }

  saveGoals() {
    localStorage.setItem('financas_goals', JSON.stringify(this.goals));
  }

  saveBudgets() {
    localStorage.setItem('financas_budgets', JSON.stringify(this.budgets));
  }

  saveRecurring() {
    localStorage.setItem('financas_recurring', JSON.stringify(this.recurring));
  }

  saveInstallments() {
    localStorage.setItem('financas_installments', JSON.stringify(this.installments));
  }

  saveSharedExpenses() {
    localStorage.setItem('financas_shared_expenses', JSON.stringify(this.sharedExpenses));
  }

  saveSharedSettlements() {
    localStorage.setItem('financas_shared_settlements', JSON.stringify(this.sharedSettlements));
  }

  saveCreditCardConfig() {
    localStorage.setItem('financas_credit_card', JSON.stringify(this.creditCardConfig));
  }

  savePrivacy(val) {
    this.privacyEnabled = val;
    localStorage.setItem('financas_privacy', val ? 'true' : 'false');
  }

  saveTimeToEarn(tte) {
    this.timeToEarn = tte;
    localStorage.setItem('financas_tte', JSON.stringify(tte));
  }

  saveCurrency(curr) {
    this.currency = curr;
    localStorage.setItem('financas_currency', curr);
  }

  saveTheme(t) {
    this.theme = t;
    localStorage.setItem('financas_theme', t);
    document.documentElement.setAttribute('data-theme', t);
  }

  // --- FILTROS DE PERÍODO ---
  getFilteredTransactions() {
    if (this.selectedPeriod === 'all') return this.transactions;

    const refDate = new Date('2026-05-19'); // Data de referência dos dados seed
    return this.transactions.filter(t => {
      const txDate = new Date(t.date);
      if (this.selectedPeriod === 'week') {
        const diffDays = (refDate - txDate) / (1000 * 3600 * 24);
        return diffDays >= 0 && diffDays <= 7;
      }
      if (this.selectedPeriod === 'month') {
        return txDate.getMonth() === refDate.getMonth() && txDate.getFullYear() === refDate.getFullYear();
      }
      if (this.selectedPeriod === 'year') {
        return txDate.getFullYear() === refDate.getFullYear();
      }
      return true;
    });
  }

  // Cálculos de saldo
  getTotals(filteredList = null) {
    const list = filteredList || this.getFilteredTransactions();
    let income = 0;
    let expense = 0;
    list.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return {
      income,
      expense,
      balance: income - expense
    };
  }

  getPatrimonioTotal() {
    let total = 0;
    this.accounts.forEach(acc => {
      let balance = acc.initialBalance;
      this.transactions.forEach(t => {
        if (t.accountId === acc.id) {
          if (t.type === 'income') balance += t.amount;
          else balance -= t.amount;
        }
      });
      total += balance;
    });
    return total;
  }

  getExpensesByCategory(filteredList = null) {
    const list = (filteredList || this.getFilteredTransactions()).filter(t => t.type === 'expense');
    const totals = {};
    let totalExpense = 0;

    list.forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      totalExpense += t.amount;
    });

    const result = Object.keys(totals).map(catName => {
      const catObj = this.categories.find(c => c.name === catName) || {
        name: catName,
        color: '#64748B',
        icon: 'tag'
      };
      const amount = totals[catName];
      const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
      return {
        ...catObj,
        amount,
        percentage
      };
    });

    return result.sort((a, b) => b.amount - a.amount);
  }

  getMonthlyHistory(monthsCount = 6) {
    const months = [
      { label: 'Dez', key: '2025-12' },
      { label: 'Jan', key: '2026-01' },
      { label: 'Fev', key: '2026-02' },
      { label: 'Mar', key: '2026-03' },
      { label: 'Abr', key: '2026-04' },
      { label: 'Mai', key: '2026-05' }
    ];

    const labels = [];
    const incomes = [];
    const expenses = [];

    months.forEach(m => {
      labels.push(m.label);
      let inc = 0;
      let exp = 0;
      this.transactions.forEach(t => {
        if (t.date.startsWith(m.key)) {
          if (t.type === 'income') inc += t.amount;
          else exp += t.amount;
        }
      });
      incomes.push(inc);
      expenses.push(exp);
    });

    return { labels, incomes, expenses };
  }
}

// Inicializa a store
const store = new Store();

// --- 4. FORMATADORES AUXILIARES & PRIVACY SHIELD ---
function formatCurrency(val, isMaskable = true) {
  if (store.privacyEnabled && isMaskable) {
    return '••••••';
  }
  const code = store.currency;
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: code
    }).format(val);
  } catch (e) {
    return `R$ ${val.toFixed(2)}`;
  }
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  const parts = isoStr.split('-');
  if (parts.length !== 3) return isoStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// --- 5. INTELIGÊNCIA: TIME TO EARN (Custo em Horas de Vida) ---
function calculateTimeToEarn(amount) {
  const cfg = store.timeToEarn;
  if (!cfg.isEnabled || cfg.monthlyIncome <= 0 || cfg.weeklyWorkHours <= 0) {
    return { hours: 0, minutes: 0, formattedString: '' };
  }
  const monthlyWorkHours = cfg.weeklyWorkHours * (52 / 12);
  const hourlyRate = cfg.monthlyIncome / monthlyWorkHours;
  if (hourlyRate <= 0 || amount <= 0) return { hours: 0, minutes: 0, formattedString: '' };

  const totalHours = amount / hourlyRate;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  let formattedString = '';
  if (hours > 0 && minutes > 0) {
    formattedString = `${hours}h ${minutes}min de trabalho`;
  } else if (hours > 0) {
    formattedString = `${hours}h de trabalho`;
  } else {
    formattedString = `${minutes}min de trabalho`;
  }

  return { hours, minutes, formattedString };
}

function toggleTimeToEarn() {
  store.timeToEarn.isEnabled = !store.timeToEarn.isEnabled;
  store.saveTimeToEarn(store.timeToEarn);
  showToast(store.timeToEarn.isEnabled ? 'Custo em Horas de Vida ativado' : 'Custo em Horas de Vida desativado');
  renderDashboard();
}

// --- 6. INTELIGÊNCIA: RITMO DE GASTOS (SPENDING PACE) ---
function calculateSpendingPace() {
  const refDate = new Date('2026-05-19'); // data base dos registros seed
  const year = refDate.getFullYear();
  const month = refDate.getMonth(); // 4 para Maio
  const currentDay = refDate.getDate(); // 19

  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 31
  const daysRemaining = Math.max(0, daysInMonth - currentDay); // 12

  const monthKey = '2026-05';
  const monthExpenses = store.transactions.filter(t => t.type === 'expense' && t.date.startsWith(monthKey) && new Date(t.date).getDate() <= currentDay);
  const spentSoFar = monthExpenses.reduce((sum, t) => sum + t.amount, 0);

  const monthBudgets = store.budgets.filter(b => b.month === 5 && b.year === 2026);
  let totalBudgetLimit = monthBudgets.reduce((sum, b) => sum + b.limit, 0);
  if (totalBudgetLimit <= 0) totalBudgetLimit = 5600;

  const idealDailyBurn = totalBudgetLimit / daysInMonth;
  const idealSpentSoFar = idealDailyBurn * currentDay;
  const dailyBurnRate = currentDay > 0 ? spentSoFar / currentDay : 0;
  const projectedMonthEnd = dailyBurnRate * daysInMonth;

  let paceStatus = 'onTrack';
  let statusLabel = 'No Ritmo';
  let statusBadgeClass = 'pace-badge-onTrack';
  let statusIcon = 'check-circle';
  let advice = 'Gasto controlado e bem distribuído ao longo dos dias.';

  if (projectedMonthEnd > totalBudgetLimit * 1.15) {
    paceStatus = 'overspending';
    statusLabel = 'Ritmo Acelerado';
    statusBadgeClass = 'pace-badge-overspending';
    statusIcon = 'flame';
    advice = `Atenção: no ritmo atual, a projeção ultrapassará a meta em ${formatCurrency(projectedMonthEnd - totalBudgetLimit, false)}.`;
  } else if (projectedMonthEnd > totalBudgetLimit * 0.95) {
    paceStatus = 'caution';
    statusLabel = 'Atenção';
    statusBadgeClass = 'pace-badge-caution';
    statusIcon = 'alert-triangle';
    advice = 'Seu ritmo de gasto está próximo do teto estabelecido para o mês.';
  }

  const percentage = Math.min((spentSoFar / totalBudgetLimit) * 100, 100);
  const idealPercentage = Math.min((idealSpentSoFar / totalBudgetLimit) * 100, 100);

  return {
    currentDay,
    daysInMonth,
    daysRemaining,
    spentSoFar,
    idealSpentSoFar,
    dailyBurnRate,
    idealDailyBurn,
    projectedMonthEnd,
    totalBudgetLimit,
    paceStatus,
    statusLabel,
    statusBadgeClass,
    statusIcon,
    advice,
    percentage,
    idealPercentage
  };
}

function renderSpendingPaceCard() {
  const container = document.getElementById('spendingPaceCard');
  if (!container) return;

  const pace = calculateSpendingPace();

  container.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <i data-lucide="gauge" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-100 flex items-center gap-2">
            Ritmo de Gastos (Burn Rate)
          </h3>
          <p class="text-xs text-gray-400">Dia ${pace.currentDay} de ${pace.daysInMonth} • Restam ${pace.daysRemaining} dias no mês</p>
        </div>
      </div>
      <span class="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${pace.statusBadgeClass}">
        <i data-lucide="${pace.statusIcon}" class="w-3.5 h-3.5"></i>
        ${pace.statusLabel}
      </span>
    </div>

    <!-- Barra Comparativa (Real vs Linha Ideal) -->
    <div class="space-y-1.5 mb-4">
      <div class="flex justify-between text-xs">
        <span class="text-gray-300">Gasto Real até Hoje: <strong>${formatCurrency(pace.spentSoFar)}</strong></span>
        <span class="text-gray-400">Meta Linear Esperada: ${formatCurrency(pace.idealSpentSoFar)}</span>
      </div>
      <div class="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div class="h-3 rounded-full transition-all duration-500" style="width: ${pace.percentage}%; background-color: ${pace.paceStatus === 'overspending' ? '#EF4444' : (pace.paceStatus === 'caution' ? '#F59E0B' : '#10B981')}"></div>
        <!-- Marcador Ideal -->
        <div class="absolute top-0 bottom-0 w-1 bg-white/80 shadow-md" style="left: ${pace.idealPercentage}%" title="Meta Linear Ideal"></div>
      </div>
      <div class="flex justify-between text-[11px] text-gray-500">
        <span>0%</span>
        <span>Marcador branco: meta ideal (${pace.idealPercentage.toFixed(0)}%)</span>
        <span>Teto: ${formatCurrency(pace.totalBudgetLimit)}</span>
      </div>
    </div>

    <!-- Métricas Diárias & Projeção -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5 text-xs">
      <div class="bg-white/5 p-3 rounded-xl">
        <span class="text-gray-400 text-[11px] block">Queima Real Diária</span>
        <span class="text-sm font-bold text-gray-100 mt-0.5 block">${formatCurrency(pace.dailyBurnRate)}/dia</span>
      </div>
      <div class="bg-white/5 p-3 rounded-xl">
        <span class="text-gray-400 text-[11px] block">Ritmo Recomendado</span>
        <span class="text-sm font-bold text-gray-100 mt-0.5 block">${formatCurrency(pace.idealDailyBurn)}/dia</span>
      </div>
      <div class="bg-white/5 p-3 rounded-xl col-span-2 sm:col-span-1">
        <span class="text-gray-400 text-[11px] block">Projeção Fim do Mês</span>
        <span class="text-sm font-bold ${pace.projectedMonthEnd > pace.totalBudgetLimit ? 'text-red-400' : 'text-emerald-400'} mt-0.5 block">
          ${formatCurrency(pace.projectedMonthEnd)}
        </span>
      </div>
    </div>
    <p class="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
      <i data-lucide="info" class="w-3.5 h-3.5 text-blue-400 flex-shrink-0"></i>
      <span>${pace.advice}</span>
    </p>
  `;

  if (window.lucide) lucide.createIcons();
}

// --- 7. INTELIGÊNCIA: CONTAS A VENCER (UPCOMING BILLS) ---
function renderUpcomingBillsCard() {
  const container = document.getElementById('upcomingBillsCard');
  if (!container) return;

  const refDate = new Date('2026-05-19');
  const limitDate = new Date(refDate);
  limitDate.setDate(limitDate.getDate() + 7);

  const upcoming = store.recurring.filter(r => r.isActive && r.type === 'expense');

  if (upcoming.length === 0) {
    container.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <i data-lucide="calendar-check" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-100">Contas a Vencer</h3>
            <p class="text-xs text-gray-400">Nenhum boleto ou assinatura pendente nos próximos 7 dias.</p>
          </div>
        </div>
        <button onclick="openRecurringModal()" class="text-xs text-blue-400 hover:text-blue-300 font-semibold">+ Nova Conta</button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  const itemsHtml = upcoming.slice(0, 4).map(bill => {
    const billDate = new Date(bill.nextDueDate);
    const diffDays = Math.ceil((billDate - refDate) / (1000 * 3600 * 24));
    let badgeText = `Vence em ${diffDays} dias`;
    let badgeClass = 'bill-normal';

    if (diffDays <= 0) {
      badgeText = 'Vence Hoje!';
      badgeClass = 'bill-urgent';
    } else if (diffDays === 1) {
      badgeText = 'Vence Amanhã';
      badgeClass = 'bill-warning';
    }

    const tteInfo = store.timeToEarn.isEnabled ? calculateTimeToEarn(bill.amount).formattedString : '';

    return `
      <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
            <i data-lucide="receipt" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-100">${bill.name}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full border ${badgeClass} font-semibold">${badgeText}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span>${bill.category}</span>
              <span>•</span>
              <span>Vencimento: ${formatDate(bill.nextDueDate)}</span>
              ${tteInfo ? `<span class="tte-chip">⏳ ${tteInfo}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right">
            <span class="text-sm font-bold text-red-400 block">${formatCurrency(bill.amount)}</span>
            <span class="text-[10px] text-gray-500 uppercase">${bill.frequency}</span>
          </div>
          <button onclick="payRecurringBill('${bill.id}')" class="py-1.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold btn-spring flex items-center gap-1" title="Lançar pagamento no extrato">
            <i data-lucide="check" class="w-3.5 h-3.5"></i>
            <span>Pagar</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <i data-lucide="calendar-clock" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-100 flex items-center gap-2">
            Contas a Vencer
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              ${upcoming.length} pendentes
            </span>
          </h3>
          <p class="text-xs text-gray-400">Despesas fixas e assinaturas dos próximos dias</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="openRecurringModal()" class="py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/10 transition">
          + Nova Conta
        </button>
        <button onclick="switchTab('settings')" class="text-xs text-blue-400 hover:text-blue-300 font-medium">Ver todas</button>
      </div>
    </div>
    <div class="space-y-2">
      ${itemsHtml}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

function payRecurringBill(billId) {
  const bill = store.recurring.find(r => r.id === billId);
  if (!bill) return;

  if (confirm(`Confirmar o pagamento de "${bill.name}" no valor de ${formatCurrency(bill.amount, false)}? Esta transação será registrada no seu extrato e a data de vencimento será atualizada para o próximo mês.`)) {
    // 1. Criar transação no extrato
    const newTx = {
      id: 'tx-' + Math.random().toString(36).substring(2, 9),
      name: bill.name,
      amount: bill.amount,
      type: bill.type,
      category: bill.category,
      accountId: bill.accountId,
      date: bill.nextDueDate,
      notes: `Pagamento automático de conta (${bill.name})`
    };
    store.transactions.unshift(newTx);
    store.saveTransactions();

    // 2. Avançar próximo vencimento em 1 mês
    const curDate = new Date(bill.nextDueDate);
    curDate.setMonth(curDate.getMonth() + 1);
    bill.nextDueDate = curDate.toISOString().split('T')[0];
    store.saveRecurring();

    showToast(`Pagamento de "${bill.name}" lançado com sucesso!`);
    renderDashboard();
    renderTransactions();
  }
}

// --- 8. MODO PRIVACIDADE (PRIVACY SHIELD) ---
function togglePrivacyShield() {
  store.privacyEnabled = !store.privacyEnabled;
  store.savePrivacy(store.privacyEnabled);
  updatePrivacyIcons();
  showToast(store.privacyEnabled ? 'Modo Privacidade ativado: valores ocultos' : 'Modo Privacidade desativado: valores visíveis');

  if (store.activeTab === 'dashboard') renderDashboard();
  else if (store.activeTab === 'transactions') renderTransactions();
  else if (store.activeTab === 'accounts') renderAccounts();
  else if (store.activeTab === 'goals') renderGoals();
  else if (store.activeTab === 'budgets') renderBudgets();
}

function updatePrivacyIcons() {
  const isPrivate = store.privacyEnabled;
  const iconName = isPrivate ? 'eye-off' : 'eye';

  ['sidebarPrivacyIcon', 'mobilePrivacyIcon', 'cardPrivacyIcon'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('data-lucide', iconName);
  });

  const cardText = document.getElementById('cardPrivacyText');
  if (cardText) cardText.textContent = isPrivate ? 'Revelar' : 'Ocultar';

  const settingToggle = document.getElementById('settingPrivacyToggle');
  if (settingToggle) settingToggle.checked = isPrivate;

  if (window.lucide) lucide.createIcons();
}

// --- 8B. CARTÕES DE CRÉDITO & FATURAS (BLOCO 2) ---
function getBestDayToBuy(closingDay = 25) {
  return closingDay === 31 ? 1 : closingDay + 1;
}

function calculateCreditCardSummary() {
  const cfg = store.creditCardConfig || DEFAULT_CREDIT_CARD_CONFIG;
  const cardAcc = store.accounts.find(a => a.id === cfg.accountId) || { name: 'Cartão Black', initialBalance: 0 };
  
  const cardTxs = store.transactions.filter(t => t.accountId === cfg.accountId);
  
  const currentInvoiceTxs = cardTxs.filter(t => {
    if (t.type !== 'expense') return false;
    const [y, m, d] = t.date.split('-').map(Number);
    if (y === 2026 && m === 5 && d <= cfg.closingDay) return true;
    if (y === 2026 && m === 4 && d > cfg.closingDay) return true;
    return false;
  });

  const invoiceAmount = currentInvoiceTxs.reduce((sum, t) => sum + t.amount, 0);
  const totalLimit = cfg.creditLimit;
  const availableLimit = Math.max(0, totalLimit - invoiceAmount);
  const usedPercentage = Math.min((invoiceAmount / totalLimit) * 100, 100);
  const bestDay = getBestDayToBuy(cfg.closingDay);

  return {
    cfg,
    cardAcc,
    invoiceAmount,
    totalLimit,
    availableLimit,
    usedPercentage,
    bestDay,
    currentInvoiceTxs
  };
}

function renderCreditCardDetailCard() {
  const container = document.getElementById('creditCardDetailCard');
  if (!container) return;

  const summary = calculateCreditCardSummary();
  const txItems = summary.currentInvoiceTxs.slice(0, 4);

  container.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
          <i data-lucide="credit-card" class="w-6 h-6"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-base font-bold text-gray-100">${summary.cardAcc.name}</h3>
            <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Fatura Aberta • Maio 2026
            </span>
          </div>
          <p class="text-xs text-gray-400 mt-0.5">
            Fechamento: dia ${summary.cfg.closingDay} • Vencimento: dia 0${summary.cfg.dueDay}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="payCreditCardInvoice()" class="py-2 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition btn-spring flex items-center gap-1.5">
          <i data-lucide="check-circle-2" class="w-4 h-4"></i>
          <span>Pagar Fatura</span>
        </button>
      </div>
    </div>

    <!-- Grid do Cartão Visual & Métricas -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Card Black Metalizado -->
      <div class="lg:col-span-5 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-white/10 shadow-2xl flex flex-col justify-between min-h-[170px]">
        <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-purple-500/10 blur-xl pointer-events-none"></div>
        <div class="flex items-center justify-between text-xs text-gray-400">
          <span class="tracking-widest font-mono text-[10px] uppercase text-gray-300">Nubank Ultravioleta Black</span>
          <i data-lucide="nfc" class="w-4 h-4 text-gray-400"></i>
        </div>
        <div>
          <span class="text-[11px] text-gray-400 block mb-0.5">Fatura Atual (a pagar)</span>
          <span class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            ${formatCurrency(summary.invoiceAmount)}
          </span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
          <span class="font-mono text-gray-300">•••• 8824</span>
          <span class="text-emerald-400 font-medium">Limite disp.: ${formatCurrency(summary.availableLimit)}</span>
        </div>
      </div>

      <!-- Métricas de Limite & Melhor Dia de Compra -->
      <div class="lg:col-span-7 flex flex-col justify-between space-y-4">
        <!-- Barra de Progresso de Limite -->
        <div class="bg-white/5 p-4 rounded-xl border border-white/5">
          <div class="flex justify-between items-center text-xs mb-1.5">
            <span class="text-gray-300">Limite Consumido: <strong>${summary.usedPercentage.toFixed(1)}%</strong></span>
            <span class="text-gray-400">Limite Total: <strong>${formatCurrency(summary.totalLimit)}</strong></span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div class="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-600" style="width: ${summary.usedPercentage}%"></div>
          </div>
          <div class="flex justify-between text-[11px] text-gray-400 mt-1.5">
            <span>Usado: ${formatCurrency(summary.invoiceAmount)}</span>
            <span class="text-emerald-400 font-semibold">Disponível: ${formatCurrency(summary.availableLimit)}</span>
          </div>
        </div>

        <!-- Destaque Melhor Dia de Compra -->
        <div class="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
            <i data-lucide="sparkles" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-bold text-purple-300">Melhor Dia de Compra: Dia ${summary.bestDay}</span>
              <span class="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded font-semibold">Até 40 dias</span>
            </div>
            <p class="text-[11px] text-gray-300 mt-0.5">
              Compras efetuadas a partir do dia ${summary.bestDay} entram somente na fatura de Junho, dando prazo máximo sem juros.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lançamentos na Fatura -->
    <div class="mt-6 pt-5 border-t border-white/5">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-300 uppercase tracking-wider">Lançamentos Recentes no Cartão</h4>
        <span class="text-xs text-gray-400">${summary.currentInvoiceTxs.length} transações</span>
      </div>
      <div class="space-y-2">
        ${txItems.length === 0 ? `
          <p class="text-xs text-gray-400 py-3 text-center">Nenhuma despesa recente lançada no cartão.</p>
        ` : txItems.map(t => `
          <div class="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition text-xs">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              </div>
              <div>
                <span class="font-medium text-gray-200 block">${t.name}</span>
                <span class="text-[10px] text-gray-400">${formatDate(t.date)} • ${t.category}</span>
              </div>
            </div>
            <span class="font-bold text-red-400">-${formatCurrency(t.amount)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

// --- 8C. COMPRAS PARCELADAS (INSTALLMENTS - BLOCO 2) ---
function calculateInstallmentSummary(item) {
  const paidAmount = item.installmentAmount * item.paidCount;
  const remainingAmount = Math.max(0, item.totalAmount - paidAmount);
  const remainingCount = Math.max(0, item.totalCount - item.paidCount);
  const progressPercent = item.totalCount > 0 ? (item.paidCount / item.totalCount) * 100 : 0;
  const isFullyPaid = item.paidCount >= item.totalCount || remainingAmount <= 0;

  return {
    paidAmount,
    remainingAmount,
    remainingCount,
    progressPercent,
    isFullyPaid
  };
}

function renderInstallmentsListCard() {
  const container = document.getElementById('installmentsListCard');
  if (!container) return;

  const installments = store.installments || [];
  const activeInstallments = installments.filter(i => !i.isFullyPaid);
  const totalDebtRemaining = activeInstallments.reduce((sum, i) => sum + (i.totalAmount - (i.installmentAmount * i.paidCount)), 0);
  const currentMonthInstallmentTotal = activeInstallments.reduce((sum, i) => sum + i.installmentAmount, 0);

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
          <i data-lucide="layers" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-base font-bold text-gray-100">Compras Parceladas (Installments)</h3>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              ${activeInstallments.length} ativas
            </span>
          </div>
          <p class="text-xs text-gray-400">Controle de compromissos futuros e quitação gradativa</p>
        </div>
      </div>
      <button onclick="openInstallmentModal()" class="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition btn-spring flex items-center gap-1.5 self-start sm:self-auto">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Nova Compra Parcelada</span>
      </button>
    </div>

    <!-- Indicadores Rápidos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
      <div class="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
        <div>
          <span class="text-xs text-gray-400">Parcelas Comprometidas no Mês</span>
          <p class="text-lg font-bold text-amber-400 mt-0.5">${formatCurrency(currentMonthInstallmentTotal)}</p>
        </div>
        <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <i data-lucide="calendar" class="w-4 h-4"></i>
        </div>
      </div>
      <div class="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
        <div>
          <span class="text-xs text-gray-400">Saldo Devedor Futuro Total</span>
          <p class="text-lg font-bold text-gray-100 mt-0.5">${formatCurrency(totalDebtRemaining)}</p>
        </div>
        <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <i data-lucide="trending-down" class="w-4 h-4"></i>
        </div>
      </div>
    </div>

    <!-- Lista de Parcelamentos -->
    <div class="space-y-3">
      ${installments.length === 0 ? `
        <div class="text-center py-6 text-gray-400 text-xs">
          Nenhuma compra parcelada cadastrada.
        </div>
      ` : installments.map(item => {
        const sum = calculateInstallmentSummary(item);
        const accObj = store.accounts.find(a => a.id === item.accountId) || { name: 'Cartão Black' };

        return `
          <div class="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 relative group">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-2.5">
                <span class="font-semibold text-sm text-gray-100">${item.baseName}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full ${sum.isFullyPaid ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold' : 'bg-white/10 text-gray-300'}">
                  ${sum.isFullyPaid ? 'Concluído' : `${item.paidCount} de ${item.totalCount} pagas`}
                </span>
                <span class="text-xs text-gray-400">• ${item.category} (${accObj.name})</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-gray-200">
                  ${formatCurrency(item.installmentAmount)}/mês
                </span>
                ${!sum.isFullyPaid ? `
                  <button onclick="payInstallmentNext('${item.id}')" class="py-1 px-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition flex items-center gap-1" title="Avançar 1 parcela">
                    <i data-lucide="check" class="w-3 h-3"></i>
                    <span>+1 Paga</span>
                  </button>
                ` : ''}
                <button onclick="deleteInstallment('${item.id}')" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition" title="Excluir">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>

            <!-- Barra de Progresso do Parcelamento -->
            <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden my-2">
              <div class="h-2 rounded-full transition-all duration-500 ${sum.isFullyPaid ? 'bg-emerald-400' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}" style="width: ${sum.progressPercent}%"></div>
            </div>

            <div class="flex justify-between text-[11px] text-gray-400">
              <span>Total: ${formatCurrency(item.totalAmount)} (Pago: ${formatCurrency(sum.paidAmount)})</span>
              <span>${sum.isFullyPaid ? 'Quitado integralmente' : `Resta: ${formatCurrency(sum.remainingAmount)} (${sum.remainingCount}x)`}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

// --- 8D. FINANÇAS COMPARTILHADAS (MODO CASAL - BLOCO 2) ---
function calculateSharedBalance() {
  const space = store.sharedSpace || DEFAULT_SHARED_SPACE;
  const expenses = store.sharedExpenses || [];
  const settlements = store.sharedSettlements || [];

  let totalSharedExpenses = 0;
  let totalPaidByMe = 0;
  let totalPaidByPartner = 0;
  let myTotalShare = 0;
  let partnerTotalShare = 0;

  expenses.forEach(item => {
    totalSharedExpenses += item.amount;
    const myShare = item.amount * item.mySplitRatio;
    const partnerShare = item.amount * (1 - item.mySplitRatio);

    myTotalShare += myShare;
    partnerTotalShare += partnerShare;

    if (item.paidBy === 'me') {
      totalPaidByMe += item.amount;
    } else {
      totalPaidByPartner += item.amount;
    }
  });

  let settlementsPaidByPartner = 0;
  let settlementsPaidByMe = 0;

  settlements.forEach(s => {
    if (s.payer === 'partner') {
      settlementsPaidByPartner += s.amount;
    } else {
      settlementsPaidByMe += s.amount;
    }
  });

  const grossPartnerOwes = totalPaidByMe - myTotalShare;
  const grossIOwe = totalPaidByPartner - partnerTotalShare;
  const netBalance = (grossPartnerOwes - grossIOwe) - settlementsPaidByPartner + settlementsPaidByMe;

  let status = 'settled';
  let statusMessage = 'Tudo em dia! Nenhuma dívida pendente.';
  let badgeClass = 'bg-gray-500/10 text-gray-300 border-gray-500/20';

  if (netBalance > 0.5) {
    status = 'partnerOwesMe';
    statusMessage = `${space.partnerName} deve a você`;
    badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  } else if (netBalance < -0.5) {
    status = 'iOwePartner';
    statusMessage = `Você deve a ${space.partnerName}`;
    badgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  }

  return {
    space,
    expenses,
    settlements,
    totalSharedExpenses,
    totalPaidByMe,
    totalPaidByPartner,
    myTotalShare,
    partnerTotalShare,
    netBalance,
    status,
    statusMessage,
    badgeClass
  };
}

function renderSharedFinancesCard() {
  const container = document.getElementById('sharedFinancesCard');
  if (!container) return;

  const shared = calculateSharedBalance();
  const absNet = Math.abs(shared.netBalance);
  const recentExpenses = shared.expenses.slice(0, 3);

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
          <i data-lucide="users" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-gray-100">Modo Casal & Finanças Compartilhadas</h3>
            <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${shared.badgeClass}">
              ${shared.statusMessage}: ${shared.status === 'settled' ? 'R$ 0,00' : formatCurrency(absNet)}
            </span>
          </div>
          <p class="text-xs text-gray-400">Espaço: ${shared.space.name} • Parceira: ${shared.space.partnerName} (Rateio 50/50)</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="openSharedExpenseModal()" class="py-1.5 px-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-lg shadow-pink-600/30 transition btn-spring flex items-center gap-1">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          <span>Nova Despesa Casal</span>
        </button>
        ${shared.status !== 'settled' ? `
          <button onclick="settleUpCouple()" class="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold transition flex items-center gap-1.5" title="Acertar contas via Pix">
            <i data-lucide="arrow-left-right" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Acertar Contas (Settle Up)</span>
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Métricas do Rateio -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5 text-xs mb-4">
      <div class="bg-white/5 p-3 rounded-xl">
        <span class="text-gray-400 text-[11px] block">Total Compartilhado</span>
        <span class="text-sm font-bold text-gray-100 mt-0.5 block">${formatCurrency(shared.totalSharedExpenses)}</span>
      </div>
      <div class="bg-white/5 p-3 rounded-xl">
        <span class="text-gray-400 text-[11px] block">Pago por Você</span>
        <span class="text-sm font-bold text-emerald-400 mt-0.5 block">${formatCurrency(shared.totalPaidByMe)}</span>
      </div>
      <div class="bg-white/5 p-3 rounded-xl">
        <span class="text-gray-400 text-[11px] block">Pago por ${shared.space.partnerName}</span>
        <span class="text-sm font-bold text-pink-400 mt-0.5 block">${formatCurrency(shared.totalPaidByPartner)}</span>
      </div>
      <div class="bg-white/5 p-3 rounded-xl">
        <span class="text-gray-400 text-[11px] block">Saldo a Liquidar</span>
        <span class="text-sm font-bold ${shared.netBalance > 0 ? 'text-emerald-400' : (shared.netBalance < 0 ? 'text-amber-400' : 'text-gray-400')} mt-0.5 block">
          ${shared.netBalance === 0 ? 'Zerado' : (shared.netBalance > 0 ? `+${formatCurrency(absNet)}` : `-${formatCurrency(absNet)}`)}
        </span>
      </div>
    </div>

    <!-- Lista das Últimas Despesas do Casal -->
    <div class="space-y-1.5">
      ${recentExpenses.map(item => `
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition text-xs border border-transparent hover:border-white/5">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg ${item.paidBy === 'me' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-pink-500/10 text-pink-400'} flex items-center justify-center font-bold text-[10px]">
              ${item.paidBy === 'me' ? 'EU' : 'ANA'}
            </div>
            <div>
              <span class="font-medium text-gray-200">${item.name}</span>
              <span class="text-[10px] text-gray-400 block">${formatDate(item.date)} • ${item.category} • Divisão ${(item.mySplitRatio * 100).toFixed(0)}% / ${((1 - item.mySplitRatio) * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div class="text-right">
            <span class="font-bold text-gray-100">${formatCurrency(item.amount)}</span>
            <span class="text-[10px] text-gray-400 block">Sua parte: ${formatCurrency(item.amount * item.mySplitRatio)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

// --- 9. CONTROLE DE GRÁFICOS (CHART.JS) ---
let donutChartInstance = null;
let trendChartInstance = null;

function renderDonutChart(catData, totalExpense) {
  const ctx = document.getElementById('donutChart');
  if (!ctx) return;

  if (donutChartInstance) {
    donutChartInstance.destroy();
  }

  if (catData.length === 0) return;

  const isDark = store.theme === 'dark';

  donutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: catData.map(c => c.name),
      datasets: [{
        data: catData.map(c => c.amount),
        backgroundColor: catData.map(c => c.color),
        borderColor: isDark ? '#111827' : '#FFFFFF',
        borderWidth: 3,
        hoverOffset: 12
      }]
    },
    options: {
      cutout: '72%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              const val = context.raw;
              const pct = totalExpense > 0 ? ((val / totalExpense) * 100).toFixed(1) : 0;
              return ` ${context.label}: ${formatCurrency(val)} (${pct}%)`;
            }
          }
        }
      },
      onHover: (event, elements) => {
        const centerTitle = document.getElementById('donutCenterTitle');
        const centerAmount = document.getElementById('donutCenterAmount');
        const centerPct = document.getElementById('donutCenterPct');

        if (elements && elements.length > 0) {
          const idx = elements[0].index;
          const selected = catData[idx];
          if (centerTitle) centerTitle.textContent = selected.name;
          if (centerAmount) centerAmount.textContent = formatCurrency(selected.amount);
          if (centerPct) centerPct.textContent = `${selected.percentage.toFixed(1)}% do total`;
        } else {
          if (centerTitle) centerTitle.textContent = 'Total Despesas';
          if (centerAmount) centerAmount.textContent = formatCurrency(totalExpense);
          if (centerPct) centerPct.textContent = `${catData.length} categorias`;
        }
      }
    }
  });

  const centerTitle = document.getElementById('donutCenterTitle');
  const centerAmount = document.getElementById('donutCenterAmount');
  const centerPct = document.getElementById('donutCenterPct');
  if (centerTitle) centerTitle.textContent = 'Total Despesas';
  if (centerAmount) centerAmount.textContent = formatCurrency(totalExpense);
  if (centerPct) centerPct.textContent = `${catData.length} categorias`;
}

function renderTrendChart() {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;

  if (trendChartInstance) {
    trendChartInstance.destroy();
  }

  const { labels, incomes, expenses } = store.getMonthlyHistory();
  const isDark = store.theme === 'dark';
  const textColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Receitas',
          data: incomes,
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#10B981',
          borderWidth: 3
        },
        {
          label: 'Despesas',
          data: expenses,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#EF4444',
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            usePointStyle: true,
            boxWidth: 8
          }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            callback: function (val) {
              return 'R$ ' + (val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val);
            }
          }
        }
      }
    }
  });
}

// --- 10. RENDERIZAÇÃO DAS TELAS ---

// A. DASHBOARD VIEW
function renderDashboard() {
  const filtered = store.getFilteredTransactions();
  const totals = store.getTotals(filtered);
  const catData = store.getExpensesByCategory(filtered);

  // Cards de Totais
  const balanceElem = document.getElementById('statBalance');
  const incomeElem = document.getElementById('statIncome');
  const expenseElem = document.getElementById('statExpense');

  if (balanceElem) {
    balanceElem.textContent = formatCurrency(totals.balance);
    balanceElem.className = totals.balance >= 0 ? 'text-emerald-400 font-bold text-3xl md:text-5xl tracking-tight' : 'text-red-400 font-bold text-3xl md:text-5xl tracking-tight';
  }
  if (incomeElem) incomeElem.textContent = formatCurrency(totals.income);
  if (expenseElem) expenseElem.textContent = formatCurrency(totals.expense);

  // Indicador de Time to Earn no saldo e despesa
  const balTteElem = document.getElementById('balanceTimeToEarn');
  const expTteElem = document.getElementById('expenseTimeToEarn');

  if (store.timeToEarn.isEnabled) {
    if (balTteElem && totals.balance > 0) {
      balTteElem.classList.remove('hidden');
      balTteElem.textContent = `Equivale a ${calculateTimeToEarn(totals.balance).formattedString}`;
    }
    if (expTteElem && totals.expense > 0) {
      expTteElem.classList.remove('hidden');
      expTteElem.textContent = `⏳ ${calculateTimeToEarn(totals.expense).formattedString}`;
    }
  } else {
    if (balTteElem) balTteElem.classList.add('hidden');
    if (expTteElem) expTteElem.classList.add('hidden');
  }

  // Atualizar ícones de privacidade
  updatePrivacyIcons();

  // Renderizar Ritmo de Gastos, Contas a Vencer e Finanças Compartilhadas (Casal)
  renderSpendingPaceCard();
  renderUpcomingBillsCard();
  renderSharedFinancesCard();
  renderCashFlowForecastCard();

  // Gráfico Donut
  renderDonutChart(catData, totals.expense);

  // Lista de Categorias
  const listElem = document.getElementById('dashboardCategoryList');
  if (listElem) {
    if (catData.length === 0) {
      listElem.innerHTML = `<div class="p-6 text-center text-gray-400">Nenhuma despesa registrada neste período.</div>`;
    } else {
      listElem.innerHTML = catData.slice(0, 6).map(cat => `
        <div class="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: ${cat.color}20; color: ${cat.color}">
              <i data-lucide="${cat.icon || 'tag'}" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="font-medium text-sm text-gray-100">${cat.name}</p>
              <div class="w-24 md:w-36 bg-gray-700/40 rounded-full h-1.5 mt-1 overflow-hidden">
                <div class="h-1.5 rounded-full" style="width: ${cat.percentage}%; background-color: ${cat.color}"></div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-sm text-gray-100">${formatCurrency(cat.amount)}</p>
            <span class="text-xs text-gray-400">${cat.percentage.toFixed(1)}%</span>
          </div>
        </div>
      `).join('');
    }
  }

  // Gráfico de Tendência
  renderTrendChart();

  // Transações Recentes
  const recentList = document.getElementById('dashboardRecentTx');
  if (recentList) {
    recentList.innerHTML = store.transactions.slice(0, 5).map(t => createTxRowHtml(t)).join('');
  }

  if (window.lucide) lucide.createIcons();
}

// B. TRANSACTIONS VIEW
function renderTransactions() {
  const container = document.getElementById('txListContainer');
  if (!container) return;

  const searchInput = document.getElementById('txSearchInput')?.value.toLowerCase() || '';
  const filterType = document.getElementById('txTypeFilter')?.value || 'all';

  let list = store.transactions.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchInput) || t.category.toLowerCase().includes(searchInput);
    const matchType = filterType === 'all' || t.type === filterType;
    return matchSearch && matchType;
  });

  if (list.length === 0) {
    container.innerHTML = `
      <div class="glass-card p-12 text-center text-gray-400">
        <i data-lucide="receipt" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
        <p class="text-lg font-medium text-gray-200">Nenhuma transação encontrada</p>
        <p class="text-sm">Tente ajustar seus filtros ou adicione uma nova transação.</p>
      </div>
    `;
  } else {
    const grouped = {};
    list.forEach(t => {
      grouped[t.date] = grouped[t.date] || [];
      grouped[t.date].push(t);
    });

    const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

    container.innerHTML = dates.map(dateStr => `
      <div class="mb-6">
        <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>${formatDate(dateStr)}</span>
          <span class="text-gray-500 font-normal">${grouped[dateStr].length} itens</span>
        </div>
        <div class="glass-card divide-y divide-white/5 overflow-hidden">
          ${grouped[dateStr].map(t => createTxRowHtml(t, true)).join('')}
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
}

function createTxRowHtml(t, canDelete = false) {
  const isIncome = t.type === 'income';
  const catObj = store.categories.find(c => c.name === t.category) || { color: '#64748B', icon: 'tag' };
  const accObj = store.accounts.find(a => a.id === t.accountId) || { name: 'Conta Principal' };
  const tteInfo = (!isIncome && store.timeToEarn.isEnabled) ? calculateTimeToEarn(t.amount).formattedString : '';

  return `
    <div class="flex items-center justify-between p-3.5 hover:bg-white/5 transition group">
      <div class="flex items-center gap-3.5">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background-color: ${catObj.color}20; color: ${catObj.color}">
          <i data-lucide="${catObj.icon || 'tag'}" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <p class="font-medium text-sm text-gray-100">${t.name}</p>
            ${t.notes ? `<span title="${t.notes}" class="text-xs text-gray-500 cursor-pointer">📝</span>` : ''}
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-400">
            <span>${t.category}</span>
            <span>•</span>
            <span class="text-gray-500">${accObj.name}</span>
            ${tteInfo ? `<span class="tte-chip ml-1">⏳ ${tteInfo}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right">
          <p class="font-semibold text-sm ${isIncome ? 'text-emerald-400' : 'text-red-400'}">
            ${isIncome ? '+' : '-'}${formatCurrency(t.amount)}
          </p>
          <span class="text-xs text-gray-500">${isIncome ? 'Receita' : 'Despesa'}</span>
        </div>
        ${canDelete ? `
          <button onclick="deleteTransaction('${t.id}')" class="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Excluir">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

// C. ACCOUNTS VIEW
function renderAccounts() {
  const container = document.getElementById('accountsListContainer');
  const totalElem = document.getElementById('totalPatrimonioValue');
  if (totalElem) totalElem.textContent = formatCurrency(store.getPatrimonioTotal());

  if (!container) return;

  const accountsWithBalance = store.accounts.map(acc => {
    let balance = acc.initialBalance;
    store.transactions.forEach(t => {
      if (t.accountId === acc.id) {
        if (t.type === 'income') balance += t.amount;
        else balance -= t.amount;
      }
    });
    return { ...acc, currentBalance: balance };
  });

  container.innerHTML = accountsWithBalance.map(acc => `
    <div class="glass-card p-5 relative overflow-hidden group">
      <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10" style="background-color: ${acc.color}"></div>
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style="background-color: ${acc.color}">
          <i data-lucide="${acc.icon || 'building-columns'}" class="w-6 h-6"></i>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
          ${acc.type}
        </span>
      </div>
      <div>
        <h3 class="text-sm font-medium text-gray-400">${acc.name}</h3>
        <p class="text-2xl font-bold mt-1 text-gray-100 ${acc.currentBalance < 0 ? 'text-red-400' : ''}">
          ${formatCurrency(acc.currentBalance)}
        </p>
      </div>
      <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
        <span>Saldo inicial: ${formatCurrency(acc.initialBalance)}</span>
        <button onclick="openEditAccountModal('${acc.id}')" class="text-blue-400 hover:text-blue-300 font-medium">Editar</button>
      </div>
    </div>
  `).join('');

  // Renderizar Fatura do Cartão Black e Gestor de Compras Parceladas (Bloco 2)
  renderCreditCardDetailCard();
  renderInstallmentsListCard();

  if (window.lucide) lucide.createIcons();
}

// --- INTELIGÊNCIA: MOTOR DE SIMULAÇÃO DE METAS CDI / SELIC (BLOCO 3) ---
class GoalProjectionEngine {
  /**
   * Simula tempo para atingir meta dado um aporte mensal fixo
   */
  static simulateMonths(currentAmount, targetAmount, monthlyContribution, annualRate = 10.5) {
    const remaining = Math.max(0, targetAmount - currentAmount);
    if (remaining <= 0) {
      return {
        months: 0,
        totalContributions: 0,
        totalInterest: 0,
        finalAmount: currentAmount,
        targetDate: new Date()
      };
    }
    if (monthlyContribution <= 0) {
      return {
        months: 999,
        totalContributions: 0,
        totalInterest: 0,
        finalAmount: currentAmount,
        targetDate: new Date()
      };
    }
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate <= 0) {
      const months = Math.ceil(remaining / monthlyContribution);
      const totalContributions = months * monthlyContribution;
      const targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + months);
      return {
        months,
        totalContributions,
        totalInterest: 0,
        finalAmount: currentAmount + totalContributions,
        targetDate
      };
    }

    let balance = currentAmount;
    let months = 0;
    let totalContributions = 0;
    const maxMonths = 360; // Limite de 30 anos

    while (balance < targetAmount && months < maxMonths) {
      const interestEarned = balance * monthlyRate;
      balance += interestEarned + monthlyContribution;
      totalContributions += monthlyContribution;
      months++;
    }

    const totalInterest = Math.max(0, balance - currentAmount - totalContributions);
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + months);

    return {
      months,
      totalContributions,
      totalInterest,
      finalAmount: balance,
      targetDate
    };
  }

  /**
   * Simula aporte mensal necessário dado um prazo fixo em meses
   */
  static simulateMonthlyContribution(currentAmount, targetAmount, targetMonths, annualRate = 10.5) {
    const remaining = Math.max(0, targetAmount - currentAmount);
    if (remaining <= 0 || targetMonths <= 0) {
      return {
        monthlyContribution: 0,
        totalContributions: 0,
        totalInterest: 0,
        finalAmount: currentAmount
      };
    }

    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate <= 0) {
      const monthlyContribution = remaining / targetMonths;
      return {
        monthlyContribution,
        totalContributions: remaining,
        totalInterest: 0,
        finalAmount: targetAmount
      };
    }

    // Fórmula FV de anuidade ordinária:
    // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
    // PMT = (FV - PV * (1 + r)^n) / [((1 + r)^n - 1) / r]
    const compFactor = Math.pow(1 + monthlyRate, targetMonths);
    const futureValueInitial = currentAmount * compFactor;
    const annuityFactor = (compFactor - 1) / monthlyRate;

    let monthlyContribution = (targetAmount - futureValueInitial) / annuityFactor;
    if (monthlyContribution < 0) monthlyContribution = 0;

    const totalContributions = monthlyContribution * targetMonths;
    const finalAmount = futureValueInitial + monthlyContribution * annuityFactor;
    const totalInterest = Math.max(0, finalAmount - currentAmount - totalContributions);

    return {
      monthlyContribution,
      totalContributions,
      totalInterest,
      finalAmount
    };
  }
}

// Estado do Simulador de Metas
let simActiveGoal = null;
let simActiveMode = 'byContribution'; // 'byContribution' | 'byTargetDate'

function openGoalSimulator(goalId) {
  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return;
  simActiveGoal = goal;

  const modal = document.getElementById('goalSimulatorModal');
  const title = document.getElementById('simGoalTitle');
  const curDisp = document.getElementById('simCurrentAmountDisplay');
  const tgtDisp = document.getElementById('simTargetAmountDisplay');
  const bar = document.getElementById('simProgressBar');
  const pct = document.getElementById('simProgressPct');
  const rem = document.getElementById('simRemainingDisplay');

  if (title) title.textContent = `Projeção CDI para: ${goal.name}`;
  if (curDisp) curDisp.textContent = formatCurrency(goal.currentAmount, false);
  if (tgtDisp) tgtDisp.textContent = formatCurrency(goal.targetAmount, false);

  const prog = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  if (bar) bar.style.width = `${prog}%`;
  if (pct) pct.textContent = `${prog.toFixed(1)}% concluído`;
  if (rem) rem.textContent = `Faltam ${formatCurrency(remaining, false)}`;

  // Inicializar campos com valores coerentes
  const monthlyInput = document.getElementById('simMonthlyContributionInput');
  const monthlyRange = document.getElementById('simMonthlyContributionRange');
  if (monthlyInput && monthlyRange) {
    const defaultContrib = Math.max(100, Math.round(remaining / 12 / 50) * 50) || 500;
    monthlyInput.value = defaultContrib;
    monthlyRange.value = defaultContrib;
  }

  setSimMode('byContribution');
  updateGoalSimulation();

  if (modal) modal.classList.remove('hidden');
}

function closeGoalSimulatorModal() {
  const modal = document.getElementById('goalSimulatorModal');
  if (modal) modal.classList.add('hidden');
  simActiveGoal = null;
}

function setSimMode(mode) {
  simActiveMode = mode;
  const btnContrib = document.getElementById('simModeContribBtn');
  const btnDate = document.getElementById('simModeDateBtn');
  const blockContrib = document.getElementById('simContributionBlock');
  const blockDate = document.getElementById('simTargetDateBlock');
  const monthlyBox = document.getElementById('simResultMonthlyBox');

  if (mode === 'byContribution') {
    if (btnContrib) {
      btnContrib.className = 'flex-1 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white transition';
    }
    if (btnDate) {
      btnDate.className = 'flex-1 py-2 text-xs font-semibold rounded-lg text-gray-400 hover:text-gray-200 transition';
    }
    if (blockContrib) blockContrib.classList.remove('hidden');
    if (blockDate) blockDate.classList.add('hidden');
    if (monthlyBox) monthlyBox.classList.add('hidden');
  } else {
    if (btnContrib) {
      btnContrib.className = 'flex-1 py-2 text-xs font-semibold rounded-lg text-gray-400 hover:text-gray-200 transition';
    }
    if (btnDate) {
      btnDate.className = 'flex-1 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white transition';
    }
    if (blockContrib) blockContrib.classList.add('hidden');
    if (blockDate) blockDate.classList.remove('hidden');
    if (monthlyBox) monthlyBox.classList.remove('hidden');
  }
  updateGoalSimulation();
}

function updateGoalSimulation() {
  if (!simActiveGoal) return;

  const annualRate = parseFloat(document.getElementById('simAnnualRateInput')?.value) || 10.5;
  const annualLabel = document.getElementById('simAnnualRateLabel');
  if (annualLabel) annualLabel.textContent = `${annualRate.toFixed(2)}% a.a.`;

  const timeElem = document.getElementById('simResultTime');
  const monthlyElem = document.getElementById('simResultMonthly');
  const investedElem = document.getElementById('simResultTotalInvested');
  const interestElem = document.getElementById('simResultTotalInterest');
  const accumElem = document.getElementById('simResultTotalAccumulated');

  if (simActiveMode === 'byContribution') {
    const monthlyVal = parseFloat(document.getElementById('simMonthlyContributionInput')?.value) || 500;
    const label = document.getElementById('simContributionLabel');
    if (label) label.textContent = formatCurrency(monthlyVal, false);

    const sim = GoalProjectionEngine.simulateMonths(
      simActiveGoal.currentAmount,
      simActiveGoal.targetAmount,
      monthlyVal,
      annualRate
    );

    const months = sim.months;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    let timeText = '';
    if (years > 0 && remMonths > 0) timeText = `${years}a ${remMonths}m (${months} meses)`;
    else if (years > 0) timeText = `${years} ano${years > 1 ? 's' : ''} (${months} meses)`;
    else timeText = `${months} meses`;

    if (months === 0) timeText = 'Meta já atingida! 🎉';
    else if (months >= 360) timeText = 'Mais de 30 anos';

    if (timeElem) timeElem.textContent = timeText;
    if (investedElem) investedElem.textContent = formatCurrency(sim.totalContributions, false);
    if (interestElem) interestElem.textContent = `+${formatCurrency(sim.totalInterest, false)}`;
    if (accumElem) accumElem.textContent = formatCurrency(sim.finalAmount, false);
  } else {
    const targetMonths = parseInt(document.getElementById('simTargetMonthsInput')?.value) || 12;
    const label = document.getElementById('simMonthsLabel');
    const years = Math.floor(targetMonths / 12);
    const remMonths = targetMonths % 12;
    let monthsText = `${targetMonths} meses`;
    if (years > 0 && remMonths > 0) monthsText = `${targetMonths} meses (${years}a ${remMonths}m)`;
    else if (years > 0) monthsText = `${targetMonths} meses (${years} ano${years > 1 ? 's' : ''})`;
    if (label) label.textContent = monthsText;

    const sim = GoalProjectionEngine.simulateMonthlyContribution(
      simActiveGoal.currentAmount,
      simActiveGoal.targetAmount,
      targetMonths,
      annualRate
    );

    if (timeElem) timeElem.textContent = monthsText;
    if (monthlyElem) monthlyElem.textContent = formatCurrency(sim.monthlyContribution, false);
    if (investedElem) investedElem.textContent = formatCurrency(sim.totalContributions, false);
    if (interestElem) interestElem.textContent = `+${formatCurrency(sim.totalInterest, false)}`;
    if (accumElem) accumElem.textContent = formatCurrency(sim.finalAmount, false);
  }
}

// Operações de Metas (Criação & Exclusão)
function openNewGoalModal() {
  const modal = document.getElementById('goalModal');
  const nameInput = document.getElementById('goalFormName');
  const targetInput = document.getElementById('goalFormTarget');
  const currentInput = document.getElementById('goalFormCurrent');
  const deadlineInput = document.getElementById('goalFormDeadline');

  if (nameInput) nameInput.value = '';
  if (targetInput) targetInput.value = '';
  if (currentInput) currentInput.value = '0.00';
  if (deadlineInput) {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    deadlineInput.value = d.toISOString().split('T')[0];
  }

  if (modal) modal.classList.remove('hidden');
}

function closeGoalModal() {
  const modal = document.getElementById('goalModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveGoal(event) {
  event.preventDefault();
  const name = document.getElementById('goalFormName')?.value.trim();
  const target = parseFloat(document.getElementById('goalFormTarget')?.value);
  const current = parseFloat(document.getElementById('goalFormCurrent')?.value) || 0;
  const deadline = document.getElementById('goalFormDeadline')?.value;
  const icon = document.getElementById('goalFormIcon')?.value || 'target';
  const color = document.getElementById('goalFormColor')?.value || '#3B82F6';

  if (!name || isNaN(target) || target <= 0) {
    alert('Preencha os dados da meta corretamente.');
    return;
  }

  const newGoal = {
    id: 'goal-' + Math.random().toString(36).substring(2, 9),
    name,
    targetAmount: target,
    currentAmount: current,
    deadline: deadline || new Date().toISOString().split('T')[0],
    icon,
    color
  };

  store.goals.push(newGoal);
  store.saveGoals();

  closeGoalModal();
  showToast(`Meta "${name}" criada com sucesso! 🎯`);
  renderGoals();
}

function deleteGoal(goalId) {
  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return;
  if (confirm(`Deseja remover a meta "${goal.name}"?`)) {
    store.goals = store.goals.filter(g => g.id !== goalId);
    store.saveGoals();
    showToast(`Meta "${goal.name}" removida.`);
    renderGoals();
  }
}

// D. GOALS VIEW
function renderGoals() {
  const container = document.getElementById('goalsListContainer');
  if (!container) return;

  if (store.goals.length === 0) {
    container.innerHTML = `
      <div class="glass-card p-12 text-center text-gray-400 col-span-full">
        <i data-lucide="target" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
        <p class="text-lg font-medium text-gray-200">Nenhuma meta cadastrada</p>
        <p class="text-sm">Clique em "Nova Meta" para criar seu primeiro objetivo financeiro.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = store.goals.map(goal => {
    const progress = Math.min(Math.max((goal.currentAmount / goal.targetAmount) * 100, 0), 100);
    const isCompleted = goal.currentAmount >= goal.targetAmount;
    const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);

    return `
      <div class="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center" style="background-color: ${goal.color}20; color: ${goal.color}">
              <i data-lucide="${goal.icon || 'target'}" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-100">${goal.name}</h3>
              <p class="text-xs text-gray-400">Prazo: ${formatDate(goal.deadline)}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            ${isCompleted ? `
              <span class="badge-income text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Concluída
              </span>
            ` : `
              <span class="text-xs font-semibold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                ${progress.toFixed(0)}%
              </span>
            `}
            <button onclick="deleteGoal('${goal.id}')" class="p-1 text-gray-500 hover:text-red-400 transition" title="Excluir meta">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <div class="my-4">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-2xl font-bold text-gray-100">${formatCurrency(goal.currentAmount)}</span>
            <span class="text-sm text-gray-400">de ${formatCurrency(goal.targetAmount)}</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <div class="h-2.5 rounded-full transition-all duration-500" style="width: ${progress}%; background: linear-gradient(90deg, ${goal.color}, #3B82F6)"></div>
          </div>
          <p class="text-xs text-gray-400 mt-2 flex justify-between">
            <span>Faltam: ${formatCurrency(remaining)}</span>
            <span>Meta ${goal.name}</span>
          </p>
        </div>

        <div class="pt-4 border-t border-white/5 space-y-2">
          <div class="flex gap-2">
            <button onclick="quickDepositGoal('${goal.id}', 100)" class="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-200 transition btn-spring">
              + R$ 100
            </button>
            <button onclick="quickDepositGoal('${goal.id}', 500)" class="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-200 transition btn-spring">
              + R$ 500
            </button>
            <button onclick="openCustomDepositModal('${goal.id}')" class="py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold transition btn-spring" title="Outro valor">
              + Outro
            </button>
          </div>
          <button onclick="openGoalSimulator('${goal.id}')" class="w-full py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition btn-spring">
            <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
            <span>Simulador CDI / Projeção</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// --- GESTÃO AVANÇADA DE ORÇAMENTOS (BLOCO 3) ---
let budgetDisplayMonth = { year: 2026, month: 5 }; // Começa em Maio de 2026

function shiftBudgetMonth(delta) {
  let m = budgetDisplayMonth.month + delta;
  let y = budgetDisplayMonth.year;
  if (m < 1) {
    m = 12;
    y -= 1;
  } else if (m > 12) {
    m = 1;
    y += 1;
  }
  budgetDisplayMonth = { year: y, month: m };
  renderBudgets();
}

function resetBudgetToCurrentMonth() {
  budgetDisplayMonth = { year: 2026, month: 5 };
  renderBudgets();
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function calculateScheduledCommitments(year, month) {
  const recurringCommitments = [];
  store.recurring.filter(r => r.isActive && r.type === 'expense').forEach(r => {
    let day = 1;
    if (r.nextDueDate) {
      const parts = r.nextDueDate.split('-');
      day = parseInt(parts[2]) || 1;
    }
    let isUpcoming = true;
    if (year === 2026 && month === 5) {
      isUpcoming = day >= 19;
    }
    if (isUpcoming) {
      recurringCommitments.push({
        id: r.id,
        name: r.name,
        amount: r.amount,
        category: r.category,
        day,
        type: 'Assinatura / Conta Fixa'
      });
    }
  });

  const installmentCommitments = [];
  store.installments.filter(i => !i.isFullyPaid && i.paidCount < i.totalCount).forEach(i => {
    let day = 15;
    if (i.nextDueDate) {
      const parts = i.nextDueDate.split('-');
      day = parseInt(parts[2]) || 15;
    }
    let isUpcoming = true;
    if (year === 2026 && month === 5) {
      isUpcoming = day >= 19;
    }
    if (isUpcoming) {
      installmentCommitments.push({
        id: i.id,
        name: `${i.baseName} (${i.paidCount + 1}/${i.totalCount})`,
        amount: i.installmentAmount,
        category: i.category,
        day,
        type: 'Compra Parcelada'
      });
    }
  });

  const all = [...recurringCommitments, ...installmentCommitments];
  all.sort((a, b) => a.day - b.day);
  const totalAmount = all.reduce((sum, item) => sum + item.amount, 0);

  return {
    items: all,
    totalAmount,
    count: all.length
  };
}

function renderBudgetMonthNavigator() {
  const container = document.getElementById('budgetMonthNavigator');
  if (!container) return;

  const monthLabel = MONTH_NAMES[budgetDisplayMonth.month - 1];
  const isCurrent = budgetDisplayMonth.year === 2026 && budgetDisplayMonth.month === 5;

  container.innerHTML = `
    <div class="flex items-center gap-2">
      <button onclick="shiftBudgetMonth(-1)" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center transition btn-spring" title="Mês anterior">
        <i data-lucide="chevron-left" class="w-4 h-4"></i>
      </button>
      <div>
        <h3 class="text-base font-bold text-gray-100 flex items-center gap-2">
          ${monthLabel} de ${budgetDisplayMonth.year}
          ${isCurrent ? '<span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Mês Atual</span>' : ''}
        </h3>
      </div>
    </div>

    <div class="flex items-center gap-2">
      ${!isCurrent ? `
        <button onclick="resetBudgetToCurrentMonth()" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition btn-spring">
          Voltar a Maio
        </button>
      ` : ''}
      <button onclick="shiftBudgetMonth(1)" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center transition btn-spring" title="Próximo mês">
        <i data-lucide="chevron-right" class="w-4 h-4"></i>
      </button>
    </div>
  `;
}

function renderScheduledCommitmentsCard(commitments) {
  const card = document.getElementById('scheduledCommitmentsCard');
  if (!card) return;

  const monthLabel = MONTH_NAMES[budgetDisplayMonth.month - 1];

  if (commitments.items.length === 0) {
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <i data-lucide="check-circle" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-100">Compromissos Agendados</h3>
            <p class="text-xs text-gray-400">Nenhuma conta ou parcela pendente para este mês.</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  card.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
          <i data-lucide="calendar-clock" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-100 flex items-center gap-2">
            Compromissos Agendados a Vencer
            <span class="text-xs font-normal text-indigo-400">(${commitments.count} itens)</span>
          </h3>
          <p class="text-xs text-gray-400">Despesas fixas e parcelas programadas para ${monthLabel}</p>
        </div>
      </div>
      <div class="text-left sm:text-right">
        <span class="text-xs text-gray-400 block">Total Comprometido:</span>
        <span class="text-base font-bold text-indigo-400">${formatCurrency(commitments.totalAmount, false)}</span>
      </div>
    </div>

    <div class="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
      ${commitments.items.map(item => `
        <div class="p-3 flex items-center justify-between hover:bg-white/5 transition text-xs">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-white/5 text-gray-300 font-mono font-bold flex items-center justify-center text-[11px]">
              ${item.day}
            </span>
            <div>
              <p class="font-medium text-gray-200">${item.name}</p>
              <p class="text-[11px] text-gray-400">${item.category} • ${item.type}</p>
            </div>
          </div>
          <span class="font-bold text-red-400">${formatCurrency(item.amount, false)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function openEditBudgetModal(budgetId) {
  const budget = store.budgets.find(b => b.id === budgetId);
  if (!budget) return;

  const modal = document.getElementById('editBudgetModal');
  const idInput = document.getElementById('editBudgetId');
  const catName = document.getElementById('editBudgetCategoryName');
  const limitInput = document.getElementById('editBudgetLimit');
  const spentHint = document.getElementById('editBudgetSpentHint');
  const catIcon = document.getElementById('editBudgetCategoryIcon');

  const catObj = store.categories.find(c => c.name === budget.category) || { color: '#3B82F6', icon: 'tag' };

  const monthKey = `${budgetDisplayMonth.year}-${String(budgetDisplayMonth.month).padStart(2, '0')}`;
  const spent = store.transactions
    .filter(t => t.date.startsWith(monthKey) && t.type === 'expense' && t.category === budget.category)
    .reduce((sum, t) => sum + t.amount, 0);

  if (idInput) idInput.value = budget.id;
  if (catName) catName.textContent = budget.category;
  if (limitInput) limitInput.value = budget.limit.toFixed(2);
  if (spentHint) spentHint.textContent = `Gastos em ${MONTH_NAMES[budgetDisplayMonth.month - 1]}: ${formatCurrency(spent, false)}`;
  if (catIcon) {
    catIcon.style.backgroundColor = `${catObj.color}20`;
    catIcon.style.color = catObj.color;
    catIcon.innerHTML = `<i data-lucide="${catObj.icon || 'tag'}" class="w-5 h-5"></i>`;
  }

  if (modal) modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeEditBudgetModal() {
  const modal = document.getElementById('editBudgetModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveBudget(event) {
  event.preventDefault();
  const id = document.getElementById('editBudgetId')?.value;
  const newLimit = parseFloat(document.getElementById('editBudgetLimit')?.value);

  if (isNaN(newLimit) || newLimit <= 0) {
    alert('Digite um valor de teto válido.');
    return;
  }

  const budget = store.budgets.find(b => b.id === id);
  if (budget) {
    budget.limit = newLimit;
    store.saveBudgets();
    showToast(`Teto da categoria "${budget.category}" atualizado para ${formatCurrency(newLimit, false)}!`);
    closeEditBudgetModal();
    renderBudgets();
  }
}

// E. BUDGETS VIEW
function renderBudgets() {
  const container = document.getElementById('budgetsListContainer');
  if (!container) return;

  renderBudgetMonthNavigator();

  const monthKey = `${budgetDisplayMonth.year}-${String(budgetDisplayMonth.month).padStart(2, '0')}`;
  const monthTransactions = store.transactions.filter(t => t.date.startsWith(monthKey) && t.type === 'expense');

  // Compromissos futuros
  const commitments = calculateScheduledCommitments(budgetDisplayMonth.year, budgetDisplayMonth.month);
  renderScheduledCommitmentsCard(commitments);

  let totalLimit = 0;
  let totalSpent = 0;

  const budgetItems = store.budgets.map(b => {
    totalLimit += b.limit;
    const spent = monthTransactions
      .filter(t => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);
    totalSpent += spent;
    const pct = b.limit > 0 ? (spent / b.limit) * 100 : 0;
    const catObj = store.categories.find(c => c.name === b.category) || { color: '#3B82F6', icon: 'tag' };

    // Ritmo de esgotamento do teto por categoria:
    let paceAdvice = '';
    const isCurrentMonth = budgetDisplayMonth.year === 2026 && budgetDisplayMonth.month === 5;
    if (isCurrentMonth && spent > 0) {
      const currentDay = 19;
      const dailyBurn = spent / currentDay;
      const projectedMonth = dailyBurn * 31;
      const daysUntilExhausted = Math.max(0, Math.floor((b.limit - spent) / dailyBurn));

      if (spent >= b.limit) {
        paceAdvice = `<span class="text-red-400 font-semibold">⚠️ Teto esgotado</span>`;
      } else if (projectedMonth > b.limit) {
        paceAdvice = `<span class="text-amber-400">🔥 No ritmo atual (~${formatCurrency(dailyBurn, false)}/dia), esgota em ~${daysUntilExhausted} dias</span>`;
      } else {
        paceAdvice = `<span class="text-emerald-400">✅ Ritmo seguro (~${formatCurrency(dailyBurn, false)}/dia)</span>`;
      }
    }

    return { ...b, spent, pct, catObj, paceAdvice };
  });

  const totalProgress = totalLimit > 0 ? Math.min((totalSpent / totalLimit) * 100, 100) : 0;
  const monthLabel = MONTH_NAMES[budgetDisplayMonth.month - 1];

  const summaryElem = document.getElementById('budgetSummaryCard');
  if (summaryElem) {
    summaryElem.innerHTML = `
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <span class="text-xs font-semibold text-blue-400 uppercase tracking-wider">Teto Mensal - ${monthLabel} ${budgetDisplayMonth.year}</span>
          <h2 class="text-3xl font-bold text-gray-100 mt-1">${formatCurrency(totalSpent)} <span class="text-lg font-normal text-gray-400">/ ${formatCurrency(totalLimit)}</span></h2>
        </div>
        <div class="text-right">
          <span class="text-sm font-semibold ${totalSpent > totalLimit ? 'text-red-400' : 'text-emerald-400'}">
            ${totalSpent > totalLimit ? 'Orçamento Estourado' : `Restam ${formatCurrency(totalLimit - totalSpent)}`}
          </span>
          <p class="text-xs text-gray-400">${totalProgress.toFixed(1)}% utilizado</p>
        </div>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div class="h-3 rounded-full transition-all duration-500" style="width: ${totalProgress}%; background: ${totalSpent > totalLimit ? '#EF4444' : '#10B981'}"></div>
      </div>
    `;
  }

  container.innerHTML = budgetItems.map(item => {
    const isOver = item.spent > item.limit;
    const isAlert = item.pct >= 80 && !isOver;

    return `
      <div class="glass-card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background-color: ${item.catObj.color}20; color: ${item.catObj.color}">
              <i data-lucide="${item.catObj.icon || 'tag'}" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="font-semibold text-sm text-gray-100">${item.category}</h4>
              <p class="text-xs text-gray-400">${formatCurrency(item.spent)} de ${formatCurrency(item.limit)}</p>
            </div>
          </div>
          <span class="text-xs font-bold px-2.5 py-1 rounded-full ${isOver ? 'badge-expense' : (isAlert ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'badge-income')}">
            ${item.pct.toFixed(0)}%
          </span>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden mb-2">
          <div class="h-2 rounded-full" style="width: ${Math.min(item.pct, 100)}%; background-color: ${isOver ? '#EF4444' : (isAlert ? '#F59E0B' : item.catObj.color)}"></div>
        </div>
        <div class="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>${isOver ? 'Excedeu ' + formatCurrency(item.spent - item.limit) : 'Disponível: ' + formatCurrency(item.limit - item.spent)}</span>
          <button onclick="openEditBudgetModal('${item.id}')" class="text-blue-400 hover:text-blue-300 font-medium transition">Alterar teto</button>
        </div>
        ${item.paceAdvice ? `<div class="pt-2 border-t border-white/5 text-[11px]">${item.paceAdvice}</div>` : ''}
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// F. CONFIGURAÇÕES VIEW
function renderSettings() {
  const currSelect = document.getElementById('settingCurrency');
  if (currSelect) currSelect.value = store.currency;

  const themeToggle = document.getElementById('settingThemeToggle');
  if (themeToggle) themeToggle.checked = store.theme === 'dark';

  const privToggle = document.getElementById('settingPrivacyToggle');
  if (privToggle) privToggle.checked = store.privacyEnabled;

  const tteToggle = document.getElementById('settingTteToggle');
  if (tteToggle) tteToggle.checked = store.timeToEarn.isEnabled;

  const tteIncome = document.getElementById('settingTteIncome');
  if (tteIncome) tteIncome.value = store.timeToEarn.monthlyIncome;

  const tteHours = document.getElementById('settingTteWeeklyHours');
  if (tteHours) tteHours.value = store.timeToEarn.weeklyWorkHours;

  const tteDays = document.getElementById('settingTteWorkDays');
  if (tteDays) tteDays.value = store.timeToEarn.workDaysPerWeek;

  const supabaseUrlInput = document.getElementById('supabaseUrlInput');
  const supabaseKeyInput = document.getElementById('supabaseKeyInput');
  if (supabaseUrlInput) supabaseUrlInput.value = store.supabaseConfig.url;
  if (supabaseKeyInput) supabaseKeyInput.value = store.supabaseConfig.anonKey;

  const txCountElem = document.getElementById('settingTxCount');
  if (txCountElem) txCountElem.textContent = `${store.transactions.length} registros salvos`;

  // Renderizar lista de assinaturas recorrentes
  const recList = document.getElementById('settingsRecurringList');
  if (recList) {
    if (store.recurring.length === 0) {
      recList.innerHTML = `<p class="text-xs text-gray-500 py-2">Nenhuma assinatura cadastrada.</p>`;
    } else {
      recList.innerHTML = store.recurring.map(r => `
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs">
          <div>
            <span class="font-semibold text-gray-200">${r.name}</span>
            <span class="text-gray-400 block text-[11px]">${r.category} • Vencimento: ${formatDate(r.nextDueDate)}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-bold text-red-400">${formatCurrency(r.amount)}</span>
            <button onclick="deleteRecurring('${r.id}')" class="text-gray-500 hover:text-red-400 transition" title="Remover regra">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  if (window.lucide) lucide.createIcons();
}

// ==============================================================================
// --- BLOCO 4: INTELIGÊNCIA PREDITIVA & OTIMIZAÇÃO FINANCEIRA ---
// ==============================================================================

// 1. MOTOR DE PREVISÃO DE FLUXO DE CAIXA (CASH FLOW FORECAST - 30 DIAS)
class CashFlowForecastEngine {
  static generateForecast(accounts, recurringRules, futureTxs = [], daysAhead = 30, refDateStr = '2026-05-19') {
    const refDate = new Date(refDateStr);
    const msInDay = 1000 * 60 * 60 * 24;
    const liquidAccounts = accounts.filter(a => a.type !== 'Cartão de Crédito');

    const balances = {};
    liquidAccounts.forEach(a => {
      balances[a.id] = (typeof a.currentBalance === 'number') ? a.currentBalance : (a.initialBalance || 0);
    });

    const alerts = [];
    const dailyPoints = [];
    let lowestBalance = Object.values(balances).reduce((sum, v) => sum + v, 0);
    let lowestDate = refDateStr;

    for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
      const curDate = new Date(refDate.getTime() + dayOffset * msInDay);
      const curDateStr = curDate.toISOString().split('T')[0];

      let dayIncomes = 0;
      let dayExpenses = 0;

      // Transações futuras agendadas
      futureTxs.filter(tx => tx.date === curDateStr).forEach(tx => {
        if (balances[tx.accountId] !== undefined) {
          if (tx.type === 'income') {
            balances[tx.accountId] += tx.amount;
            dayIncomes += tx.amount;
          } else {
            balances[tx.accountId] -= tx.amount;
            dayExpenses += tx.amount;
          }
        }
      });

      // Recorrências ativas
      recurringRules.filter(r => r.isActive).forEach(r => {
        const rDate = new Date(r.nextDueDate);
        if (curDate >= rDate) {
          let matches = false;
          if (r.frequency === 'daily') matches = true;
          else if (r.frequency === 'weekly') matches = curDate.getDay() === rDate.getDay();
          else if (r.frequency === 'monthly') matches = curDate.getDate() === rDate.getDate();
          else if (r.frequency === 'yearly') matches = curDate.getMonth() === rDate.getMonth() && curDate.getDate() === rDate.getDate();

          if (matches && balances[r.accountId] !== undefined) {
            if (r.type === 'income') {
              balances[r.accountId] += r.amount;
              dayIncomes += r.amount;
            } else {
              balances[r.accountId] -= r.amount;
              dayExpenses += r.amount;
            }
          }
        }
      });

      // Faturas de cartão com vencimento
      const dayOfMonth = curDate.getDate();
      accounts.filter(a => a.type === 'Cartão de Crédito' && a.dueDay === dayOfMonth).forEach(card => {
        const debt = card.currentDebt || 0;
        if (debt > 0 && liquidAccounts[0]) {
          balances[liquidAccounts[0].id] = (balances[liquidAccounts[0].id] || 0) - debt;
          dayExpenses += debt;
        }
      });

      const totalLiquidToday = Object.values(balances).reduce((sum, v) => sum + v, 0);
      if (totalLiquidToday < lowestBalance) {
        lowestBalance = totalLiquidToday;
        lowestDate = curDateStr;
      }

      dailyPoints.push({
        date: curDateStr,
        balance: Math.round(totalLiquidToday * 100) / 100,
        scheduledIncomes: dayIncomes,
        scheduledExpenses: dayExpenses,
        isNegative: totalLiquidToday < 0
      });

      // Alertas por conta individual
      liquidAccounts.forEach(acc => {
        const bal = balances[acc.id] || 0;
        if (bal < 0 && !alerts.some(al => al.accountId === acc.id)) {
          const deficit = Math.abs(bal);
          const rescues = liquidAccounts
            .filter(a => a.id !== acc.id && (balances[a.id] || 0) > deficit)
            .sort((a, b) => (balances[b.id] || 0) - (balances[a.id] || 0));
          const bestRescue = rescues[0];

          alerts.push({
            id: `alert-${acc.id}-${curDateStr}`,
            accountId: acc.id,
            accountName: acc.name,
            accountIcon: acc.icon || 'landmark',
            predictedDate: curDateStr,
            projectedBalance: Math.round(bal * 100) / 100,
            projectedDeficit: Math.round(deficit * 100) / 100,
            severity: 'critical',
            causeDescription: 'Despesas e contas agendadas superam o saldo desta conta.',
            suggestedRescueAccountId: bestRescue ? bestRescue.id : null,
            suggestedRescueAccountName: bestRescue ? bestRescue.name : null,
            suggestedTransferAmount: Math.round((deficit + 50) * 100) / 100
          });
        }
      });
    }

    let overallSeverity = 'healthy';
    let headlineAdvice = `Fluxo de caixa saudável e sem riscos de descoberto nos próximos ${daysAhead} dias.`;
    if (alerts.length > 0) {
      overallSeverity = 'critical';
      headlineAdvice = `${alerts.length} conta${alerts.length > 1 ? 's têm' : ' tem'} risco de saldo negativo projetado nos próximos ${daysAhead} dias.`;
    } else if (lowestBalance < 200) {
      overallSeverity = 'warning';
      headlineAdvice = `Projeção de fluxo apertada: saldo combinado atingirá reserva mínima nos próximos dias.`;
    }

    return {
      daysProjected: daysAhead,
      alerts,
      overallSeverity,
      lowestProjectedBalance: Math.round(lowestBalance * 100) / 100,
      lowestBalanceDate: lowestDate,
      dailyPoints,
      headlineAdvice
    };
  }
}

// 2. MOTOR DE SIMULAÇÃO "EFEITO BORBOLETA" (WHAT-IF SIMULATOR)
class WhatIfEngine {
  static analyze(amount, isRecurring = false, goals = [], monthlyIncome = 6000, currentMonthSpent = 0, monthlyBudget = null, daysRemaining = 12, annualRate = 8.0) {
    const p = Math.max(0, amount);
    const r = annualRate / 100.0 / 12.0;

    const futureValue = (months) => {
      if (isRecurring) {
        if (r <= 0) return p * months;
        return p * ((Math.pow(1.0 + r, months) - 1.0) / r);
      } else {
        return p * Math.pow(1.0 + r, months);
      }
    };

    const val1y = futureValue(12);
    const val5y = futureValue(60);
    const val10y = futureValue(120);
    const totalInvested10y = isRecurring ? p * 120 : p;
    const interest10y = Math.max(0, val10y - totalInvested10y);

    const opportunity = {
      oneYearValue: Math.round(val1y * 100) / 100,
      fiveYearsValue: Math.round(val5y * 100) / 100,
      tenYearsValue: Math.round(val10y * 100) / 100,
      totalInterestTenYears: Math.round(interest10y * 100) / 100,
      annualRatePercent: annualRate
    };

    // Meta Impacto
    let goalImpact = null;
    const activeGoals = goals.filter(g => !g.isCompleted && g.targetAmount > g.currentAmount);
    if (activeGoals.length > 0) {
      const primaryGoal = [...activeGoals].sort((a, b) => {
        const da = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const db = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        return da - db;
      })[0];
      const remaining = Math.max(0, primaryGoal.targetAmount - primaryGoal.currentAmount);
      if (remaining > 0) {
        const pct = Math.min(100.0, (p / remaining) * 100.0);
        const dailyCap = Math.max(50.0, monthlyIncome * 0.15) / 30.0;
        const daysOneOff = Math.max(1, Math.round(p / dailyCap));
        const days = isRecurring ? daysOneOff * 6 : daysOneOff;
        goalImpact = {
          goalName: primaryGoal.name,
          remainingTarget: remaining,
          daysAcceleratedIfSaved: days,
          daysDelayedIfSpent: days,
          percentOfGoalRemaining: Math.round(pct * 10) / 10
        };
      }
    }

    // Orçamento Impacto
    const safeDays = Math.max(1, daysRemaining);
    const ceiling = (monthlyBudget && monthlyBudget > 0) ? monthlyBudget : (monthlyIncome > 0 ? monthlyIncome * 0.7 : 1500);
    const curRemaining = Math.max(0, ceiling - currentMonthSpent);
    const curDaily = curRemaining / safeDays;
    const newRemaining = Math.max(0, curRemaining - p);
    const newDaily = newRemaining / safeDays;
    const reduction = curDaily - newDaily;
    const willExceed = (currentMonthSpent + p) > ceiling;
    const budgetImpact = {
      currentDailySafeSpend: Math.round(curDaily * 100) / 100,
      newDailySafeSpend: Math.round(newDaily * 100) / 100,
      dailySpendReduction: Math.round(Math.max(0, reduction) * 100) / 100,
      percentOfMonthlyIncome: monthlyIncome > 0 ? Math.round((p / monthlyIncome) * 1000) / 10 : 0,
      willExceedBudget: willExceed
    };

    // Gravidade
    const effectivePct = monthlyIncome > 0 ? (p / monthlyIncome) * 100 : 5;
    const weightedPct = isRecurring ? effectivePct * 4 : effectivePct;
    let impactLevel = 'low';
    let impactLabel = 'Leve';
    let impactEmoji = '🌱';
    let impactColorHex = '#10B981';

    if (willExceed || weightedPct >= 25) {
      impactLevel = 'critical';
      impactLabel = 'Crítico';
      impactEmoji = '🚨';
      impactColorHex = '#A855F7';
    } else if (weightedPct >= 12) {
      impactLevel = 'high';
      impactLabel = 'Significativo';
      impactEmoji = '🔥';
      impactColorHex = '#EF4444';
    } else if (weightedPct >= 4) {
      impactLevel = 'moderate';
      impactLabel = 'Moderado';
      impactEmoji = '⚡️';
      impactColorHex = '#F59E0B';
    }

    // Horas de vida
    const hourlyRate = monthlyIncome > 0 ? monthlyIncome / (40 * 4.3333) : 34.61;
    const hours = hourlyRate > 0 ? p / hourlyRate : 0;
    const wholeH = Math.floor(hours);
    const min = Math.round((hours - wholeH) * 60);
    const lifeTimeFormatted = `${wholeH}h ${min}min de trabalho`;

    // Headlines
    let headline = 'Decisão com baixo impacto no seu equilíbrio';
    let detail = `Este gasto cabe com folga no seu orçamento. Se investido a 8% a.a., renderia ${formatCurrency(val5y)} em 5 anos.`;

    if (isRecurring) {
      headline = 'Pequena assinatura, grande impacto futuro';
      detail = `Se investido a 8% ao ano, esse gasto recorrente acumularia ${formatCurrency(val5y)} em 5 anos e ${formatCurrency(val10y)} em 10 anos.`;
    } else if (impactLevel === 'critical') {
      headline = 'Alerta de Efeito Borboleta Crítico';
      detail = 'Essa decisão pode comprometer o teto do mês ou desviar consideravelmente suas metas de poupança prioritárias.';
    } else if (impactLevel === 'high') {
      headline = 'Atenção: Impacto sensível nas suas metas';
      detail = `Este gasto consome fatia relevante do seu saldo livre. Em 10 anos, esse capital renderia ${formatCurrency(val10y)}.`;
    } else if (impactLevel === 'moderate') {
      if (goalImpact) {
        headline = `Pausa para reflexão: ${goalImpact.daysAcceleratedIfSaved} dias mais perto da sua meta`;
        detail = `Se guardar este valor na meta "${goalImpact.goalName}", você antecipará o objetivo em ${goalImpact.daysAcceleratedIfSaved} dias.`;
      } else {
        headline = 'Impacto moderado nas suas finanças';
        detail = `Investido com juros compostos a 8% a.a., esse valor se transforma em ${formatCurrency(val5y)} em 5 anos.`;
      }
    }

    return {
      amount: p,
      isRecurringMonthly: isRecurring,
      impactLevel,
      impactLevelLabel: impactLabel,
      impactEmoji,
      impactColorHex,
      goalImpact,
      opportunityCost: opportunity,
      budgetImpact,
      lifeTimeHours: Math.round(hours * 10) / 10,
      lifeTimeFormatted,
      headlineAdvice: headline,
      detailedAdvice: detail
    };
  }
}

// 3. MOTOR DETECTOR DE GASTOS VAMPIROS & INFLAÇÃO PESSOAL
class VampireDetectorEngine {
  static matchCancellationUrl(name) {
    const guides = {
      netflix: 'https://www.netflix.com/youraccount',
      spotify: 'https://www.spotify.com/account',
      apple: 'https://support.apple.com/HT202039',
      icloud: 'https://support.apple.com/HT207594',
      amazon: 'https://www.amazon.com/mc/manage',
      prime: 'https://www.amazon.com/mc/manage',
      disney: 'https://www.disneyplus.com/account',
      hbo: 'https://auth.max.com',
      max: 'https://auth.max.com',
      youtube: 'https://www.youtube.com/paid_memberships',
      chatgpt: 'https://chatgpt.com/#settings',
      openai: 'https://chatgpt.com/#settings'
    };
    const lower = name.toLowerCase();
    for (const [key, url] of Object.entries(guides)) {
      if (lower.includes(key)) return url;
    }
    return null;
  }

  static detectPriceHike(name, currentAmount, transactions) {
    const norm = name.trim().toLowerCase();
    const matching = transactions
      .filter(t => t.type === 'expense' && t.name.trim().toLowerCase() === norm && t.amount > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (matching.length < 2) return null;
    for (let i = 1; i < matching.length; i++) {
      const older = matching[i];
      if (older.amount < currentAmount && older.amount > 0) {
        const diff = currentAmount - older.amount;
        const pct = (diff / older.amount) * 100;
        if (pct >= 3.0) {
          return {
            previousAmount: older.amount,
            currentAmount,
            percentIncrease: Math.round(pct * 10) / 10
          };
        }
      }
    }
    return null;
  }

  static detectImplicitSubscriptions(transactions, seenNames) {
    const expenseTxs = transactions.filter(t => t.type === 'expense' && t.amount > 0);
    const grouped = {};
    expenseTxs.forEach(t => {
      const norm = t.name.trim().toLowerCase();
      if (!norm || seenNames.has(norm)) return;
      if (!grouped[norm]) grouped[norm] = [];
      grouped[norm].push(t);
    });

    const detected = [];
    Object.values(grouped).forEach(txs => {
      if (txs.length < 2) return;
      const sorted = [...txs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const latestAmount = sorted[0].amount;
      const sameAmountCount = sorted.filter(t => Math.abs(t.amount - latestAmount) <= 1.5).length;
      if (sameAmountCount / sorted.length < 0.7) return;

      const intervals = [];
      for (let i = 0; i < sorted.length - 1; i++) {
        const d1 = new Date(sorted[i].date).getTime();
        const d2 = new Date(sorted[i + 1].date).getTime();
        intervals.push(Math.round(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24)));
      }
      if (intervals.length === 0) return;
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

      if (avgInterval >= 24 && avgInterval <= 35) {
        const monthlyCost = latestAmount;
        const annualCost = monthlyCost * 12;
        const hike = this.detectPriceHike(sorted[0].name, latestAmount, transactions);
        const cancelUrl = this.matchCancellationUrl(sorted[0].name);

        detected.push({
          id: `implicit-${sorted[0].name.toLowerCase().replace(/\s+/g, '-')}`,
          name: sorted[0].name,
          categoryName: sorted[0].category || 'Assinatura Oculta',
          monthlyCost,
          annualCost,
          frequencyLabel: 'Mensal (Detectado)',
          isRegisteredRecurrence: false,
          lastChargedDate: sorted[0].date,
          priceHike: hike,
          cancellationUrlString: cancelUrl
        });
      }
    });

    return detected;
  }

  static calculatePersonalInflation(transactions, refDateStr = '2026-05-19') {
    const refDate = new Date(refDateStr);
    const msInDay = 1000 * 60 * 60 * 24;
    const currentPeriodStart = new Date(refDate.getTime() - 30 * msInDay);
    const previousPeriodStart = new Date(refDate.getTime() - 60 * msInDay);

    const expenses = transactions.filter(t => t.type === 'expense' && t.amount > 0);
    const curTxs = expenses.filter(t => {
      const d = new Date(t.date);
      return d >= currentPeriodStart && d <= refDate;
    });
    const prevTxs = expenses.filter(t => {
      const d = new Date(t.date);
      return d >= previousPeriodStart && d < currentPeriodStart;
    });

    const currentTotal = curTxs.reduce((sum, t) => sum + t.amount, 0);
    const previousTotal = prevTxs.reduce((sum, t) => sum + t.amount, 0);
    const overallRate = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

    const curByCat = {};
    curTxs.forEach(t => {
      const c = t.category || 'Outros';
      curByCat[c] = (curByCat[c] || 0) + t.amount;
    });
    const prevByCat = {};
    prevTxs.forEach(t => {
      const c = t.category || 'Outros';
      prevByCat[c] = (prevByCat[c] || 0) + t.amount;
    });

    const allCats = new Set([...Object.keys(curByCat), ...Object.keys(prevByCat)]);
    const catInflations = [];
    let maxDelta = 0;
    let mainDriver = null;

    allCats.forEach(cat => {
      const cur = curByCat[cat] || 0;
      const prev = prevByCat[cat] || 0;
      if (cur === 0 && prev === 0) return;
      const rate = prev > 0 ? ((cur - prev) / prev) * 100 : 100;
      const delta = cur - prev;
      if (delta > maxDelta) {
        maxDelta = delta;
        mainDriver = cat;
      }
      catInflations.push({
        categoryName: cat,
        currentMonthSpent: cur,
        previousMonthSpent: prev,
        ratePercent: Math.round(rate * 10) / 10
      });
    });

    catInflations.sort((a, b) => Math.abs(b.ratePercent) - Math.abs(a.ratePercent));

    return {
      overallRatePercent: Math.round(overallRate * 10) / 10,
      categoryInflations: catInflations,
      currentPeriodTotal: currentTotal,
      previousPeriodTotal: previousTotal,
      mainDriverCategory: mainDriver
    };
  }

  static analyze(transactions, recurringRules, monthlyIncome = 6000, weeklyHours = 40, refDateStr = '2026-05-19') {
    const subs = [];
    const seenNames = new Set();

    recurringRules.filter(r => r.type === 'expense' && r.isActive).forEach(rec => {
      const norm = rec.name.trim().toLowerCase();
      seenNames.add(norm);

      let monthlyCost = rec.amount;
      if (rec.frequency === 'daily') monthlyCost = rec.amount * 30;
      else if (rec.frequency === 'weekly') monthlyCost = rec.amount * 4.3333;
      else if (rec.frequency === 'yearly') monthlyCost = rec.amount / 12;

      const annualCost = monthlyCost * 12;
      const hike = this.detectPriceHike(rec.name, rec.amount, transactions);
      const cancelUrl = this.matchCancellationUrl(rec.name);

      subs.push({
        id: rec.id,
        name: rec.name,
        categoryName: rec.category || 'Recorrente',
        monthlyCost: Math.round(monthlyCost * 100) / 100,
        annualCost: Math.round(annualCost * 100) / 100,
        frequencyLabel: rec.frequency === 'monthly' ? 'Mensal' : rec.frequency,
        isRegisteredRecurrence: true,
        priceHike: hike,
        cancellationUrlString: cancelUrl
      });
    });

    const implicit = this.detectImplicitSubscriptions(transactions, seenNames);
    subs.push(...implicit);
    subs.sort((a, b) => b.annualCost - a.annualCost);

    const totalMonthlyDrain = subs.reduce((sum, s) => sum + s.monthlyCost, 0);
    const totalAnnualDrain = subs.reduce((sum, s) => sum + s.annualCost, 0);

    const hourlyRate = (monthlyIncome > 0 && weeklyHours > 0) ? (monthlyIncome / (weeklyHours * 4.3333)) : 34.61;
    const annualHours = hourlyRate > 0 ? totalAnnualDrain / hourlyRate : 0;
    const annualDays = Math.round((annualHours / 8) * 10) / 10;

    const priceHikes = subs.filter(s => s.priceHike !== null);
    const inflation = this.calculatePersonalInflation(transactions, refDateStr);

    let grade = 'A';
    let summary = 'Excelente controle de gastos fixos e assinaturas recorrentes!';

    if (subs.length === 0) {
      grade = 'A+';
      summary = 'Perfeito! Nenhum dreno silencioso de assinatura detectado.';
    } else if (totalMonthlyDrain > 350 || priceHikes.length >= 2 || inflation.overallRatePercent > 15.0) {
      grade = 'D';
      summary = 'Atenção Crítica: Suas assinaturas e inflação pessoal estão drenando quantia elevada do seu orçamento.';
    } else if (totalMonthlyDrain > 180 || priceHikes.length >= 1 || inflation.overallRatePercent > 8.0) {
      grade = 'C';
      summary = 'Alerta de Dreno: Existem assinaturas pesando no ano e itens com reajuste silencioso de preço.';
    } else if (totalMonthlyDrain > 80) {
      grade = 'B';
      summary = 'Bom controle, mas vale a pena revisar assinaturas que você usa com pouca frequência.';
    }

    return {
      subscriptions: subs,
      totalMonthlyDrain: Math.round(totalMonthlyDrain * 100) / 100,
      totalAnnualDrain: Math.round(totalAnnualDrain * 100) / 100,
      annualWorkingDaysDrained: annualDays,
      priceHikes,
      inflation,
      vampireHealthGrade: grade,
      adviceSummary: summary
    };
  }
}

// 4. CONTROLADORES DE UI DO BLOCO 4

// A. Card de Previsão de Fluxo de Caixa (Dashboard)
function renderCashFlowForecastCard() {
  const container = document.getElementById('cashFlowForecastCard');
  if (!container) return;

  const report = CashFlowForecastEngine.generateForecast(
    store.accounts,
    store.recurring,
    [],
    30,
    '2026-05-19'
  );

  if (report.alerts.length === 0) {
    container.innerHTML = `
      <div class="flex items-center justify-between p-1">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <i data-lucide="shield-check" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Previsão 30 Dias</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">Seguro 🛡️</span>
            </div>
            <h4 class="text-sm font-bold text-gray-100 mt-0.5">Fluxo de Caixa Sem Riscos</h4>
            <p class="text-xs text-gray-400 mt-0.5">Nenhuma conta corre risco de saldo negativo com base nas transações e contas agendadas.</p>
          </div>
        </div>
        <div class="hidden sm:block text-right">
          <span class="text-[11px] text-gray-400 block">Menor saldo projetado:</span>
          <span class="text-sm font-bold text-emerald-400 block">${formatCurrency(report.lowestProjectedBalance)}</span>
        </div>
      </div>
    `;
  } else {
    const alert = report.alerts[0];
    container.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <i data-lucide="alert-triangle" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Aviso Preditivo de Liquidez</span>
              <h4 class="text-sm font-bold text-gray-100">Risco de Saldo Negativo em ${formatDate(alert.predictedDate)}</h4>
            </div>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
            ${report.alerts.length} Risco${report.alerts.length > 1 ? 's' : ''}
          </span>
        </div>

        <div class="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p class="text-gray-200">
              A conta <strong>${alert.accountName}</strong> atingirá saldo de
              <strong class="text-red-400">${formatCurrency(alert.projectedBalance)}</strong> devido aos vencimentos previstos.
            </p>
            ${alert.suggestedRescueAccountId ? `
              <p class="text-gray-400 mt-1 flex items-center gap-1.5">
                <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-yellow-400"></i>
                Sugestão: transfira <strong>${formatCurrency(alert.suggestedTransferAmount)}</strong> da conta <strong>${alert.suggestedRescueAccountName}</strong>.
              </p>
            ` : ''}
          </div>

          ${alert.suggestedRescueAccountId ? `
            <button onclick="executePreventiveTransfer('${alert.suggestedRescueAccountId}', '${alert.accountId}', ${alert.suggestedTransferAmount})" class="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition shadow-lg shadow-orange-600/30 flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto btn-spring">
              <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
              <span>Prevenir Descoberto</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  if (window.lucide) lucide.createIcons();
}

function executePreventiveTransfer(fromAccId, toAccId, amount) {
  const fromAcc = store.accounts.find(a => a.id === fromAccId);
  const toAcc = store.accounts.find(a => a.id === toAccId);
  if (!fromAcc || !toAcc) return;

  // Lança a transferência
  store.transactions.unshift({
    id: 'tx-preventive-' + Date.now(),
    name: `Resgate Preventivo: ${fromAcc.name} → ${toAcc.name}`,
    amount: amount,
    date: '2026-05-19',
    type: 'income',
    category: 'Transferência',
    accountId: toAcc.id,
    notes: 'Transferência preventiva acionada pelo Assistente Preditivo para evitar descoberto.'
  });

  store.transactions.unshift({
    id: 'tx-preventive-debit-' + Date.now(),
    name: `Transferência Preventiva para ${toAcc.name}`,
    amount: amount,
    date: '2026-05-19',
    type: 'expense',
    category: 'Transferência',
    accountId: fromAcc.id,
    notes: 'Débito para proteção de saldo.'
  });

  store.saveTransactions();
  showToast(`✅ Transferência preventiva de ${formatCurrency(amount)} realizada com sucesso! Saldo protegido.`);
  renderDashboard();
  renderAccounts();
}

// B. Simulador What-If (Efeito Borboleta)
function openWhatIfModal(initialAmount = 50) {
  const modal = document.getElementById('whatIfModal');
  const input = document.getElementById('whatIfAmountInput');
  const toggle = document.getElementById('whatIfRecurringToggle');

  if (input) input.value = initialAmount;
  if (toggle) toggle.checked = false;

  if (modal) modal.classList.remove('hidden');
  updateWhatIfSimulation();
  if (window.lucide) lucide.createIcons();
}

function closeWhatIfModal() {
  const modal = document.getElementById('whatIfModal');
  if (modal) modal.classList.add('hidden');
}

function setWhatIfAmount(amt) {
  const input = document.getElementById('whatIfAmountInput');
  if (input) input.value = amt;
  updateWhatIfSimulation();
}

function updateWhatIfSimulation() {
  const amount = parseFloat(document.getElementById('whatIfAmountInput')?.value) || 0;
  const isRecurring = document.getElementById('whatIfRecurringToggle')?.checked || false;

  // Gastos no mês atual
  const mayTxs = store.transactions.filter(t => t.date.startsWith('2026-05') && t.type === 'expense');
  const currentMonthSpent = mayTxs.reduce((sum, t) => sum + t.amount, 0);

  const res = WhatIfEngine.analyze(
    amount,
    isRecurring,
    store.goals,
    store.timeToEarn?.monthlyIncome || 6000,
    currentMonthSpent,
    null,
    12,
    8.0
  );

  // Banner
  const banner = document.getElementById('whatIfImpactBanner');
  if (banner) {
    banner.style.borderColor = `${res.impactColorHex}40`;
    banner.style.backgroundColor = `${res.impactColorHex}12`;
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-3xl">${res.impactEmoji}</span>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider block" style="color: ${res.impactColorHex}">
            Impacto Sistêmico: ${res.impactLevelLabel}
          </span>
          <h4 class="text-sm font-bold text-gray-100">${res.headlineAdvice}</h4>
        </div>
      </div>
    `;
  }

  // Custo Oportunidade
  const el1y = document.getElementById('whatIf1yValue');
  const el5y = document.getElementById('whatIf5yValue');
  const el10y = document.getElementById('whatIf10yValue');
  if (el1y) el1y.textContent = formatCurrency(res.opportunityCost.oneYearValue);
  if (el5y) el5y.textContent = formatCurrency(res.opportunityCost.fiveYearsValue);
  if (el10y) el10y.textContent = formatCurrency(res.opportunityCost.tenYearsValue);

  // Metas
  const goalCard = document.getElementById('whatIfGoalCard');
  if (goalCard) {
    if (res.goalImpact) {
      goalCard.innerHTML = `
        <span class="text-xs font-bold text-purple-400 block flex items-center gap-1.5">
          <i data-lucide="target" class="w-3.5 h-3.5"></i>
          Meta Prioritária
        </span>
        <h5 class="text-sm font-bold text-gray-100 mt-1">${res.goalImpact.goalName}</h5>
        <p class="text-xs text-gray-300 mt-0.5">
          Impacto de <strong>±${res.goalImpact.daysAcceleratedIfSaved} dias</strong> ${isRecurring ? 'no ano' : ''} no prazo alvo (${res.goalImpact.percentOfGoalRemaining}% restante).
        </p>
      `;
    } else {
      goalCard.innerHTML = `
        <span class="text-xs font-bold text-gray-400 block">Metas Ativas</span>
        <p class="text-xs text-gray-400 mt-1">Nenhuma meta pendente cadastrada no momento.</p>
      `;
    }
  }

  // Ritmo Diário & Horas de Vida
  const budgetCard = document.getElementById('whatIfBudgetCard');
  if (budgetCard) {
    budgetCard.innerHTML = `
      <span class="text-xs font-bold text-blue-400 block flex items-center gap-1.5">
        <i data-lucide="clock" class="w-3.5 h-3.5"></i>
        Ritmo Diário & Horas de Vida
      </span>
      <p class="text-xs text-gray-200 mt-1">
        Teto seguro ajustado: <strong>${formatCurrency(res.budgetImpact.newDailySafeSpend)}/dia</strong>.
      </p>
      <span class="text-[11px] text-purple-300 block mt-0.5 font-medium">
        ⏳ Equivale a <strong>${res.lifeTimeFormatted}</strong>
      </span>
    `;
  }

  // Conselho
  const headlineEl = document.getElementById('whatIfAdviceHeadline');
  const detailEl = document.getElementById('whatIfAdviceDetail');
  if (headlineEl) headlineEl.textContent = res.headlineAdvice;
  if (detailEl) detailEl.textContent = res.detailedAdvice;

  if (window.lucide) lucide.createIcons();
}

// C. Detector de Gastos Vampiros & Inflação Pessoal
let vampireActiveTab = 'subs';

function openVampireDetectorModal() {
  const modal = document.getElementById('vampireDetectorModal');
  if (modal) modal.classList.remove('hidden');
  renderVampireReport();
  if (window.lucide) lucide.createIcons();
}

function closeVampireDetectorModal() {
  const modal = document.getElementById('vampireDetectorModal');
  if (modal) modal.classList.add('hidden');
}

function setVampireTab(tab) {
  vampireActiveTab = tab;
  const btnSubs = document.getElementById('vampireTabSubsBtn');
  const btnInfl = document.getElementById('vampireTabInflBtn');

  if (tab === 'subs') {
    if (btnSubs) btnSubs.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white transition';
    if (btnInfl) btnInfl.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition';
  } else {
    if (btnSubs) btnSubs.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition';
    if (btnInfl) btnInfl.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white transition';
  }

  renderVampireReport();
}

function renderVampireReport() {
  const report = VampireDetectorEngine.analyze(
    store.transactions,
    store.recurring,
    store.timeToEarn?.monthlyIncome || 6000,
    store.timeToEarn?.weeklyWorkHours || 40,
    '2026-05-19'
  );

  // Top KPIs
  const gradeBadge = document.getElementById('vampireGradeBadge');
  const adviceSummary = document.getElementById('vampireAdviceSummary');
  const annualDrain = document.getElementById('vampireAnnualDrain');
  const monthlyDrain = document.getElementById('vampireMonthlyDrain');
  const workingDays = document.getElementById('vampireWorkingDays');
  const inflationRate = document.getElementById('vampireInflationRate');
  const subsCount = document.getElementById('vampireSubsCount');

  if (gradeBadge) gradeBadge.textContent = report.vampireHealthGrade;
  if (adviceSummary) adviceSummary.textContent = report.adviceSummary;
  if (annualDrain) annualDrain.textContent = formatCurrency(report.totalAnnualDrain);
  if (monthlyDrain) monthlyDrain.textContent = `${formatCurrency(report.totalMonthlyDrain)}/mês`;
  if (workingDays) workingDays.textContent = `${report.annualWorkingDaysDrained.toFixed(1)} d`;
  if (inflationRate) {
    const rate = report.inflation.overallRatePercent;
    inflationRate.textContent = `${rate >= 0 ? '+' : ''}${rate.toFixed(1)}%`;
  }
  if (subsCount) subsCount.textContent = report.subscriptions.length;

  const container = document.getElementById('vampireContentContainer');
  if (!container) return;

  if (vampireActiveTab === 'subs') {
    if (report.subscriptions.length === 0) {
      container.innerHTML = `<p class="p-8 text-center text-xs text-gray-400">Nenhuma assinatura silenciosa detectada nos lançamentos.</p>`;
    } else {
      container.innerHTML = report.subscriptions.map(sub => `
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 text-purple-300 flex items-center justify-center font-bold">
              <i data-lucide="${sub.isRegisteredRecurrence ? 'repeat' : 'ghost'}" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h5 class="text-sm font-bold text-gray-100">${sub.name}</h5>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium">${sub.frequencyLabel}</span>
                ${sub.priceHike ? `
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">
                    ⚠️ +${sub.priceHike.percentIncrease}%
                  </span>
                ` : ''}
              </div>
              <p class="text-xs text-gray-400 mt-0.5">
                ${sub.categoryName} • Custo Anual: <strong class="text-gray-200">${formatCurrency(sub.annualCost)}</strong>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-right">
            <div>
              <span class="text-sm font-bold text-red-400 block">${formatCurrency(sub.monthlyCost)}</span>
              <span class="text-[10px] text-gray-500 block">/mês</span>
            </div>
            ${sub.cancellationUrlString ? `
              <a href="${sub.cancellationUrlString}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 text-xs font-semibold flex items-center gap-1 transition" title="Guia direto de cancelamento oficial">
                <span>Cancelar</span>
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  } else {
    // Aba: Inflação Pessoal
    const infl = report.inflation;
    container.innerHTML = `
      <div class="space-y-4">
        <div class="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div>
            <span class="text-xs text-gray-400 block">Janela de Comparação:</span>
            <span class="text-sm font-bold text-gray-100 block mt-0.5">Últimos 30 dias vs 30 dias anteriores</span>
            ${infl.mainDriverCategory ? `
              <span class="text-xs text-amber-400 font-semibold block mt-1">
                🔥 Maior Acelerador: Categoria "${infl.mainDriverCategory}"
              </span>
            ` : ''}
          </div>
          <div class="text-right">
            <span class="text-xs text-gray-400 block">Variação Real:</span>
            <span class="text-xl font-black ${infl.overallRatePercent > 0 ? 'text-red-400' : 'text-emerald-400'} block">
              ${infl.overallRatePercent >= 0 ? '+' : ''}${infl.overallRatePercent.toFixed(1)}%
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <h5 class="text-xs font-bold text-gray-300 uppercase tracking-wider">Variação por Categoria</h5>
          ${infl.categoryInflations.map(c => `
            <div class="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-gray-200 block">${c.categoryName}</span>
                <span class="text-gray-400 block text-[11px]">
                  Anterior: ${formatCurrency(c.previousMonthSpent)} → Atual: ${formatCurrency(c.currentMonthSpent)}
                </span>
              </div>
              <span class="font-bold px-2 py-0.5 rounded ${c.ratePercent > 10 ? 'bg-red-500/20 text-red-400' : (c.ratePercent > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400')}">
                ${c.ratePercent >= 0 ? '+' : ''}${c.ratePercent.toFixed(1)}%
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (window.lucide) lucide.createIcons();
}

// --- 11. NAVEGAÇÃO SPA ---

function switchTab(tabName) {
  store.activeTab = tabName;

  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('bg-blue-600', 'text-white');
      item.classList.remove('text-gray-400', 'hover:bg-white/5');
    } else {
      item.classList.remove('bg-blue-600', 'text-white');
      item.classList.add('text-gray-400', 'hover:bg-white/5');
    }
  });

  document.querySelectorAll('.dock-item').forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  const tabIds = ['dashboard', 'transactions', 'accounts', 'goals', 'budgets', 'settings'];
  tabIds.forEach(id => {
    const el = document.getElementById(`tab-section-${id}`);
    if (el) {
      if (id === tabName) {
        el.classList.remove('hidden');
        el.classList.add('animate-fade-in');
      } else {
        el.classList.add('hidden');
        el.classList.remove('animate-fade-in');
      }
    }
  });

  if (tabName === 'dashboard') renderDashboard();
  else if (tabName === 'transactions') renderTransactions();
  else if (tabName === 'accounts') renderAccounts();
  else if (tabName === 'goals') renderGoals();
  else if (tabName === 'budgets') renderBudgets();
  else if (tabName === 'settings') renderSettings();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 12. OPERAÇÕES CRUD E MODAIS ---

// Nova Transação
function openNewTxModal(type = 'expense') {
  const modal = document.getElementById('txModal');
  const typeSelect = document.getElementById('txFormType');
  const catSelect = document.getElementById('txFormCategory');
  const accSelect = document.getElementById('txFormAccount');
  const dateInput = document.getElementById('txFormDate');

  if (typeSelect) typeSelect.value = type;
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  if (catSelect) {
    catSelect.innerHTML = store.categories.map(c => `
      <option value="${c.name}">${c.name}</option>
    `).join('');
  }

  if (accSelect) {
    accSelect.innerHTML = store.accounts.map(a => `
      <option value="${a.id}">${a.name}</option>
    `).join('');
  }

  document.getElementById('txFormName').value = '';
  document.getElementById('txFormAmount').value = '';
  document.getElementById('txFormNotes').value = '';

  if (modal) modal.classList.remove('hidden');
}

function closeTxModal() {
  const modal = document.getElementById('txModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveTx(event) {
  event.preventDefault();
  const name = document.getElementById('txFormName').value.trim();
  const amount = parseFloat(document.getElementById('txFormAmount').value);
  const type = document.getElementById('txFormType').value;
  const category = document.getElementById('txFormCategory').value;
  const accountId = document.getElementById('txFormAccount').value;
  const date = document.getElementById('txFormDate').value;
  const notes = document.getElementById('txFormNotes').value.trim();

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Por favor, preencha o nome e um valor válido.');
    return;
  }

  const newTx = {
    id: 'tx-' + Math.random().toString(36).substring(2, 9),
    name,
    amount,
    type,
    category,
    accountId,
    date: date || new Date().toISOString().split('T')[0],
    notes
  };

  store.transactions.unshift(newTx);
  store.saveTransactions();

  closeTxModal();
  showToast('Transação registrada com sucesso!');

  if (store.activeTab === 'dashboard') renderDashboard();
  else if (store.activeTab === 'transactions') renderTransactions();
}

function deleteTransaction(id) {
  if (confirm('Deseja realmente remover esta transação?')) {
    store.transactions = store.transactions.filter(t => t.id !== id);
    store.saveTransactions();
    showToast('Transação excluída');
    if (store.activeTab === 'dashboard') renderDashboard();
    else if (store.activeTab === 'transactions') renderTransactions();
  }
}

// Modal Recorrência
function openRecurringModal() {
  const modal = document.getElementById('recurringModal');
  const catSelect = document.getElementById('recFormCategory');
  const accSelect = document.getElementById('recFormAccount');
  const dateInput = document.getElementById('recFormNextDueDate');

  if (catSelect) {
    catSelect.innerHTML = store.categories.map(c => `
      <option value="${c.name}">${c.name}</option>
    `).join('');
  }
  if (accSelect) {
    accSelect.innerHTML = store.accounts.map(a => `
      <option value="${a.id}">${a.name}</option>
    `).join('');
  }
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  document.getElementById('recFormName').value = '';
  document.getElementById('recFormAmount').value = '';

  if (modal) modal.classList.remove('hidden');
}

function closeRecurringModal() {
  const modal = document.getElementById('recurringModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveRecurring(event) {
  event.preventDefault();
  const name = document.getElementById('recFormName').value.trim();
  const amount = parseFloat(document.getElementById('recFormAmount').value);
  const type = document.getElementById('recFormType').value;
  const category = document.getElementById('recFormCategory').value;
  const frequency = document.getElementById('recFormFrequency').value;
  const accountId = document.getElementById('recFormAccount').value;
  const nextDueDate = document.getElementById('recFormNextDueDate').value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Por favor, preencha o nome e um valor válido.');
    return;
  }

  const newRec = {
    id: 'rec-' + Math.random().toString(36).substring(2, 9),
    name,
    amount,
    type,
    category,
    frequency,
    accountId,
    nextDueDate: nextDueDate || new Date().toISOString().split('T')[0],
    isActive: true
  };

  store.recurring.push(newRec);
  store.saveRecurring();

  closeRecurringModal();
  showToast('Regra recorrente salva com sucesso!');

  if (store.activeTab === 'dashboard') renderDashboard();
  else if (store.activeTab === 'settings') renderSettings();
}

function deleteRecurring(id) {
  if (confirm('Deseja remover esta regra recorrente?')) {
    store.recurring = store.recurring.filter(r => r.id !== id);
    store.saveRecurring();
    showToast('Regra recorrente removida');
    if (store.activeTab === 'dashboard') renderDashboard();
    else if (store.activeTab === 'settings') renderSettings();
  }
}

// --- MODAL & OPERAÇÕES DE PARCELAMENTO (BLOCO 2) ---
function openInstallmentModal() {
  const modal = document.getElementById('installmentModal');
  const catSelect = document.getElementById('instFormCategory');
  const accSelect = document.getElementById('instFormAccount');

  if (catSelect) {
    catSelect.innerHTML = store.categories.map(c => `
      <option value="${c.name}">${c.name}</option>
    `).join('');
  }
  if (accSelect) {
    accSelect.innerHTML = store.accounts.map(a => `
      <option value="${a.id}">${a.name}</option>
    `).join('');
    const blackAcc = store.accounts.find(a => a.id === 'acc-3');
    if (blackAcc) accSelect.value = 'acc-3';
  }

  document.getElementById('instFormName').value = '';
  document.getElementById('instFormTotal').value = '';
  document.getElementById('instFormCount').value = '10';
  document.getElementById('instFormPaid').value = '1';

  if (modal) modal.classList.remove('hidden');
}

function closeInstallmentModal() {
  const modal = document.getElementById('installmentModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveInstallment(event) {
  event.preventDefault();
  const name = document.getElementById('instFormName').value.trim();
  const total = parseFloat(document.getElementById('instFormTotal').value);
  const count = parseInt(document.getElementById('instFormCount').value) || 1;
  const paid = parseInt(document.getElementById('instFormPaid').value) || 0;
  const category = document.getElementById('instFormCategory').value;
  const accountId = document.getElementById('instFormAccount').value;

  if (!name || isNaN(total) || total <= 0 || count <= 0) {
    alert('Preencha os dados do parcelamento corretamente.');
    return;
  }

  const installmentAmount = total / count;
  const newInst = {
    id: 'inst-' + Math.random().toString(36).substring(2, 9),
    baseName: name,
    totalAmount: total,
    installmentAmount,
    paidCount: paid,
    totalCount: count,
    frequency: 'monthly',
    firstDueDate: '2026-05-19',
    nextDueDate: '2026-06-19',
    category,
    accountId,
    isFullyPaid: paid >= count
  };

  store.installments.push(newInst);
  store.saveInstallments();

  closeInstallmentModal();
  showToast('Compra parcelada cadastrada com sucesso!');
  if (store.activeTab === 'accounts') renderAccounts();
}

function payInstallmentNext(id) {
  const item = store.installments.find(i => i.id === id);
  if (!item) return;

  if (item.paidCount < item.totalCount) {
    item.paidCount += 1;
    if (item.paidCount >= item.totalCount) {
      item.isFullyPaid = true;
      showToast(`Parabéns! Você quitou todas as parcelas de "${item.baseName}"! 🎉`);
    } else {
      showToast(`Parcela ${item.paidCount}/${item.totalCount} registrada para "${item.baseName}"`);
    }
    store.saveInstallments();
    if (store.activeTab === 'accounts') renderAccounts();
  }
}

function deleteInstallment(id) {
  if (confirm('Deseja excluir este parcelamento?')) {
    store.installments = store.installments.filter(i => i.id !== id);
    store.saveInstallments();
    showToast('Parcelamento removido');
    if (store.activeTab === 'accounts') renderAccounts();
  }
}

// --- MODAL & OPERAÇÕES DO MODO CASAL (FINANÇAS COMPARTILHADAS - BLOCO 2) ---
function openSharedExpenseModal() {
  const modal = document.getElementById('sharedExpenseModal');
  const catSelect = document.getElementById('sharedFormCategory');

  if (catSelect) {
    catSelect.innerHTML = store.categories.map(c => `
      <option value="${c.name}">${c.name}</option>
    `).join('');
  }

  document.getElementById('sharedFormName').value = '';
  document.getElementById('sharedFormAmount').value = '';
  document.getElementById('sharedFormPayer').value = 'me';
  document.getElementById('sharedFormSplit').value = '0.5';

  if (modal) modal.classList.remove('hidden');
}

function closeSharedExpenseModal() {
  const modal = document.getElementById('sharedExpenseModal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveSharedExpense(event) {
  event.preventDefault();
  const name = document.getElementById('sharedFormName').value.trim();
  const amount = parseFloat(document.getElementById('sharedFormAmount').value);
  const payer = document.getElementById('sharedFormPayer').value;
  const splitRatio = parseFloat(document.getElementById('sharedFormSplit').value) || 0.5;
  const category = document.getElementById('sharedFormCategory').value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Preencha os dados da despesa corretamente.');
    return;
  }

  const newExpense = {
    id: 'se-' + Math.random().toString(36).substring(2, 9),
    name,
    amount,
    date: new Date().toISOString().split('T')[0],
    category,
    paidBy: payer,
    mySplitRatio: splitRatio
  };

  store.sharedExpenses.unshift(newExpense);
  store.saveSharedExpenses();

  if (payer === 'me') {
    const newTx = {
      id: 'tx-' + Math.random().toString(36).substring(2, 9),
      name: `[Casal] ${name}`,
      amount,
      type: 'expense',
      category,
      accountId: 'acc-1',
      date: newExpense.date,
      notes: `Despesa compartilhada com ${store.sharedSpace.partnerName} (${(splitRatio * 100).toFixed(0)}%)`
    };
    store.transactions.unshift(newTx);
    store.saveTransactions();
  }

  closeSharedExpenseModal();
  showToast('Despesa compartilhada registrada com sucesso!');
  if (store.activeTab === 'dashboard') renderDashboard();
  else if (store.activeTab === 'transactions') renderTransactions();
}

function settleUpCouple() {
  const shared = calculateSharedBalance();
  if (shared.status === 'settled' || Math.abs(shared.netBalance) < 0.01) {
    showToast('Tudo em dia! Não há pendências para acertar.');
    return;
  }

  const absAmount = Math.abs(shared.netBalance);
  const partnerName = shared.space.partnerName;
  const isPartnerPayingMe = shared.netBalance > 0;

  const msg = isPartnerPayingMe
    ? `Registrar acerto de contas? ${partnerName} fez um Pix de ${formatCurrency(absAmount, false)} para você.`
    : `Registrar acerto de contas? Você fez um Pix de ${formatCurrency(absAmount, false)} para ${partnerName}.`;

  if (confirm(msg)) {
    const settlement = {
      id: 'set-' + Math.random().toString(36).substring(2, 9),
      spaceId: shared.space.id,
      amount: absAmount,
      date: new Date().toISOString().split('T')[0],
      payer: isPartnerPayingMe ? 'partner' : 'me',
      notes: `Acerto de contas Pix - Quitação total`
    };

    store.sharedSettlements.push(settlement);
    store.saveSharedSettlements();

    const newTx = {
      id: 'tx-' + Math.random().toString(36).substring(2, 9),
      name: isPartnerPayingMe ? `Pix Recebido - Acerto Casal (${partnerName})` : `Pix Enviado - Acerto Casal (${partnerName})`,
      amount: absAmount,
      type: isPartnerPayingMe ? 'income' : 'expense',
      category: isPartnerPayingMe ? 'Reembolso' : 'Transferências',
      accountId: 'acc-1',
      date: settlement.date,
      notes: 'Acerto de contas finanças compartilhadas'
    };
    store.transactions.unshift(newTx);
    store.saveTransactions();

    showToast(`Acerto de contas realizado! Saldo liquidado com sucesso. 🎉`);
    if (store.activeTab === 'dashboard') renderDashboard();
    else if (store.activeTab === 'transactions') renderTransactions();
  }
}

// --- PAGAMENTO DE FATURA DO CARTÃO BLACK (BLOCO 2) ---
function payCreditCardInvoice() {
  const summary = calculateCreditCardSummary();
  if (summary.invoiceAmount <= 0) {
    showToast('Fatura sem saldo pendente.');
    return;
  }

  const mainAcc = store.accounts.find(a => a.id === 'acc-1') || { name: 'Nubank Principal' };

  if (confirm(`Confirmar o pagamento da fatura no valor de ${formatCurrency(summary.invoiceAmount, false)} debitando da conta "${mainAcc.name}"?`)) {
    const newTx = {
      id: 'tx-' + Math.random().toString(36).substring(2, 9),
      name: `Pagamento Fatura ${summary.cardAcc.name}`,
      amount: summary.invoiceAmount,
      type: 'expense',
      category: 'Crédito',
      accountId: mainAcc.id,
      date: new Date().toISOString().split('T')[0],
      notes: `Fatura paga com sucesso`
    };

    store.transactions.unshift(newTx);
    store.saveTransactions();

    showToast(`Fatura de ${formatCurrency(summary.invoiceAmount, false)} paga com sucesso!`);
    if (store.activeTab === 'accounts') renderAccounts();
    else if (store.activeTab === 'dashboard') renderDashboard();
    else if (store.activeTab === 'transactions') renderTransactions();
  }
}

// Metas - Aporte rápido & Celebração (Bloco 3)
function quickDepositGoal(goalId, amount) {
  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return;

  const wasCompleted = goal.currentAmount >= goal.targetAmount;
  goal.currentAmount += amount;
  const nowCompleted = goal.currentAmount >= goal.targetAmount;

  store.saveGoals();

  if (!wasCompleted && nowCompleted) {
    showToast(`🎉 PARABÉNS! Você atingiu 100% da meta "${goal.name}"!`);
  } else {
    showToast(`Aporte de ${formatCurrency(amount, false)} realizado na meta "${goal.name}"!`);
  }

  renderGoals();
  if (simActiveGoal && simActiveGoal.id === goalId) {
    openGoalSimulator(goalId);
  }
}

function openCustomDepositModal(goalId) {
  const val = prompt('Digite o valor a ser aportado (R$):');
  if (val) {
    const num = parseFloat(val.replace(',', '.'));
    if (!isNaN(num) && num > 0) {
      quickDepositGoal(goalId, num);
    }
  }
}

// Exportar CSV
function exportCSV() {
  const headers = 'Data,Nome,Tipo,Categoria,Valor,Notas\n';
  const rows = store.transactions.map(t => {
    const typeStr = t.type === 'income' ? 'Receita' : 'Despesa';
    return `${formatDate(t.date)},${t.name},${typeStr},${t.category},${t.amount.toFixed(2)},${t.notes || ''}`;
  }).join('\n');

  const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `financas_export_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Arquivo CSV exportado!');
}

function resetToSeedData() {
  if (confirm('Deseja recarregar os dados do arquivo seed.csv original? Todas as alterações manuais serão substituídas.')) {
    store.transactions = store.parseSeedCSV(RAW_SEED_CSV);
    store.saveTransactions();
    showToast('Dados do seed.csv recarregados!');
    renderDashboard();
    renderTransactions();
  }
}

// Toast Notificação
function showToast(msg) {
  const toast = document.getElementById('appToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 3000);
}

// --- 13. INICIALIZAÇÃO NO DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', store.theme);

  if (window.lucide) lucide.createIcons();

  // Render inicial
  switchTab('dashboard');

  // Event Listeners dos Filtros de Período
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.period-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('text-gray-400', 'hover:text-gray-200');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('text-gray-400', 'hover:text-gray-200');
      store.selectedPeriod = btn.getAttribute('data-period');
      renderDashboard();
    });
  });

  // Filtro de Transações
  document.getElementById('txSearchInput')?.addEventListener('input', () => renderTransactions());
  document.getElementById('txTypeFilter')?.addEventListener('change', () => renderTransactions());

  // Forms Submit
  document.getElementById('txForm')?.addEventListener('submit', handleSaveTx);
  document.getElementById('recurringForm')?.addEventListener('submit', handleSaveRecurring);
  document.getElementById('installmentForm')?.addEventListener('submit', handleSaveInstallment);
  document.getElementById('sharedExpenseForm')?.addEventListener('submit', handleSaveSharedExpense);
  document.getElementById('goalForm')?.addEventListener('submit', handleSaveGoal);
  document.getElementById('editBudgetForm')?.addEventListener('submit', handleSaveBudget);

  // Sincronização e Listeners do Simulador de Metas (Bloco 3)
  const rangeContrib = document.getElementById('simMonthlyContributionRange');
  const inputContrib = document.getElementById('simMonthlyContributionInput');
  if (rangeContrib && inputContrib) {
    rangeContrib.addEventListener('input', (e) => {
      inputContrib.value = e.target.value;
      updateGoalSimulation();
    });
    inputContrib.addEventListener('input', (e) => {
      rangeContrib.value = e.target.value;
      updateGoalSimulation();
    });
  }

  const rangeMonths = document.getElementById('simTargetMonthsRange');
  const inputMonths = document.getElementById('simTargetMonthsInput');
  if (rangeMonths && inputMonths) {
    rangeMonths.addEventListener('input', (e) => {
      inputMonths.value = e.target.value;
      updateGoalSimulation();
    });
    inputMonths.addEventListener('input', (e) => {
      rangeMonths.value = e.target.value;
      updateGoalSimulation();
    });
  }

  const rangeRate = document.getElementById('simAnnualRateRange');
  const inputRate = document.getElementById('simAnnualRateInput');
  if (rangeRate && inputRate) {
    rangeRate.addEventListener('input', (e) => {
      inputRate.value = e.target.value;
      updateGoalSimulation();
    });
    inputRate.addEventListener('input', (e) => {
      rangeRate.value = e.target.value;
      updateGoalSimulation();
    });
  }

  // Toggle de Moeda
  document.getElementById('settingCurrency')?.addEventListener('change', (e) => {
    store.saveCurrency(e.target.value);
    showToast(`Moeda alterada para ${e.target.value}`);
    if (store.activeTab === 'dashboard') renderDashboard();
    else if (store.activeTab === 'transactions') renderTransactions();
    else if (store.activeTab === 'accounts') renderAccounts();
    else if (store.activeTab === 'goals') renderGoals();
    else if (store.activeTab === 'budgets') renderBudgets();
  });

  // Toggle de Tema
  document.getElementById('settingThemeToggle')?.addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    store.saveTheme(newTheme);
    renderDashboard();
  });

  // Eventos de Configuração do Bloco 1 (Privacy & Time to Earn)
  document.getElementById('settingPrivacyToggle')?.addEventListener('change', (e) => {
    store.savePrivacy(e.target.checked);
    updatePrivacyIcons();
    showToast(e.target.checked ? 'Valores serão ocultos por padrão' : 'Valores visíveis por padrão');
  });

  document.getElementById('settingTteToggle')?.addEventListener('change', (e) => {
    store.timeToEarn.isEnabled = e.target.checked;
    store.saveTimeToEarn(store.timeToEarn);
    showToast(e.target.checked ? 'Custo em Horas de Vida ativado' : 'Custo em Horas de Vida desativado');
  });

  document.getElementById('settingTteIncome')?.addEventListener('change', (e) => {
    store.timeToEarn.monthlyIncome = parseFloat(e.target.value) || 6500;
    store.saveTimeToEarn(store.timeToEarn);
    showToast('Salário para cálculo de horas atualizado');
  });

  document.getElementById('settingTteWeeklyHours')?.addEventListener('change', (e) => {
    store.timeToEarn.weeklyWorkHours = parseFloat(e.target.value) || 40;
    store.saveTimeToEarn(store.timeToEarn);
  });

  document.getElementById('settingTteWorkDays')?.addEventListener('change', (e) => {
    store.timeToEarn.workDaysPerWeek = parseInt(e.target.value) || 5;
    store.saveTimeToEarn(store.timeToEarn);
  });

  // Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
