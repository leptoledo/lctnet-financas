/**
 * Finanças - Aplicação Multiplataforma (Web & Android)
 * Arquitetura de Estado Reativo & Integração Supabase
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
    // Meses de Dez/2025 a Maio/2026
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

// --- 4. FORMATADORES AUXILIARES ---
function formatCurrency(val) {
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

// --- 5. CONTROLE DE GRÁFICOS (CHART.JS) ---
let donutChartInstance = null;
let trendChartInstance = null;

function renderDonutChart(catData, totalExpense) {
  const ctx = document.getElementById('donutChart');
  if (!ctx) return;

  if (donutChartInstance) {
    donutChartInstance.destroy();
  }

  if (catData.length === 0) {
    return;
  }

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

  // Atualiza centro padrão
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

// --- 6. RENDERIZAÇÃO DAS TELAS ---

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
    // Agrupar por data
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

  if (window.lucide) lucide.createIcons();
}

// D. GOALS VIEW
function renderGoals() {
  const container = document.getElementById('goalsListContainer');
  if (!container) return;

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
          ${isCompleted ? `
            <span class="badge-income text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
              <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Concluída
            </span>
          ` : `
            <span class="text-xs font-semibold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
              ${progress.toFixed(0)}%
            </span>
          `}
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

        <div class="pt-4 border-t border-white/5 flex gap-2">
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
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// E. BUDGETS VIEW
function renderBudgets() {
  const container = document.getElementById('budgetsListContainer');
  if (!container) return;

  // Gastos do mês de maio/2026
  const monthTransactions = store.transactions.filter(t => t.date.startsWith('2026-05') && t.type === 'expense');
  
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

    return {
      ...b,
      spent,
      pct,
      catObj
    };
  });

  const totalProgress = totalLimit > 0 ? Math.min((totalSpent / totalLimit) * 100, 100) : 0;

  // Header de Resumo
  const summaryElem = document.getElementById('budgetSummaryCard');
  if (summaryElem) {
    summaryElem.innerHTML = `
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <span class="text-xs font-semibold text-blue-400 uppercase tracking-wider">Teto Mensal - Maio 2026</span>
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
        <div class="flex justify-between text-xs text-gray-400">
          <span>${isOver ? 'Excedeu ' + formatCurrency(item.spent - item.limit) : 'Disponível: ' + formatCurrency(item.limit - item.spent)}</span>
          <button onclick="openEditBudgetModal('${item.id}')" class="text-blue-400 hover:text-blue-300">Alterar teto</button>
        </div>
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

  const supabaseUrlInput = document.getElementById('supabaseUrlInput');
  const supabaseKeyInput = document.getElementById('supabaseKeyInput');
  if (supabaseUrlInput) supabaseUrlInput.value = store.supabaseConfig.url;
  if (supabaseKeyInput) supabaseKeyInput.value = store.supabaseConfig.anonKey;

  const txCountElem = document.getElementById('settingTxCount');
  if (txCountElem) txCountElem.textContent = `${store.transactions.length} registros salvos`;
}

// --- 7. NAVEGAÇÃO SPA ---
function switchTab(tabName) {
  store.activeTab = tabName;

  // Atualizar visual do menu lateral (desktop)
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('bg-blue-600', 'text-white');
      item.classList.remove('text-gray-400', 'hover:bg-white/5');
    } else {
      item.classList.remove('bg-blue-600', 'text-white');
      item.classList.add('text-gray-400', 'hover:bg-white/5');
    }
  });

  // Atualizar visual do dock (mobile)
  document.querySelectorAll('.dock-item').forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Alternar seções
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

  // Renderizar view correspondente
  if (tabName === 'dashboard') renderDashboard();
  else if (tabName === 'transactions') renderTransactions();
  else if (tabName === 'accounts') renderAccounts();
  else if (tabName === 'goals') renderGoals();
  else if (tabName === 'budgets') renderBudgets();
  else if (tabName === 'settings') renderSettings();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 8. OPERAÇÕES CRUD E MODAIS ---

// Nova Transação
function openNewTxModal(type = 'expense') {
  const modal = document.getElementById('txModal');
  const typeSelect = document.getElementById('txFormType');
  const catSelect = document.getElementById('txFormCategory');
  const accSelect = document.getElementById('txFormAccount');
  const dateInput = document.getElementById('txFormDate');

  if (typeSelect) typeSelect.value = type;
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  // Popula categorias
  if (catSelect) {
    catSelect.innerHTML = store.categories.map(c => `
      <option value="${c.name}">${c.name}</option>
    `).join('');
  }

  // Popula contas
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

// Metas - Aporte rápido
function quickDepositGoal(goalId, amount) {
  const goal = store.goals.find(g => g.id === goalId);
  if (!goal) return;

  goal.currentAmount += amount;
  store.saveGoals();
  showToast(`Aporte de ${formatCurrency(amount)} realizado na meta "${goal.name}"!`);
  renderGoals();
}

function openCustomDepositModal(goalId) {
  const val = prompt('Digite o valor a ser aportado:');
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

// Restaurar dados padrão do seed
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

// --- 9. INICIALIZAÇÃO NO DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  // Aplicar tema
  document.documentElement.setAttribute('data-theme', store.theme);

  // Inicializar Lucide Icons
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

  // Form Submit
  document.getElementById('txForm')?.addEventListener('submit', handleSaveTx);

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

  // Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
