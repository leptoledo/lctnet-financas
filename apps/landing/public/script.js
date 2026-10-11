/**
 * Finanças Landing Page - Interatividade Estilo NexusHR / NexusOS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Ícones Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Dados das Abas de Funcionalidades (Estilo NexusOS)
  const featuresData = [
    {
      id: 'pacing',
      headline: 'Ritmo de Gastos Diário (Burn Rate Preditivo)',
      description: 'Saiba exatamente quanto pode gastar hoje sem estourar o orçamento do mês. Nosso algoritmo recalcula seu teto diário automaticamente após cada transação.',
      items: [
        'Cálculo dinâmico de teto diário restante',
        'Alerta inteligente de ritmo acelerado',
        'Controle de queima antes do fechamento da fatura',
        'Equilíbrio entre despesas fixas e variáveis',
        'Projeção automática para o último dia do mês'
      ],
      previewTitle: 'Ritmo de Gastos em Tempo Real',
      metricLabel: 'Ritmo Diário Ideal',
      metricVal: 'R$ 180,65 /dia',
      metricBadge: 'Status: No Ritmo Ideal',
      cardTag: 'Módulo Orçamentário'
    },
    {
      id: 'whatif',
      headline: 'Simulador "Efeito Borboleta" & Custo CDI',
      description: 'Descubra o impacto oculto de pequenos gastos recorrentes no longo prazo. Simule aportes e veja quanto você perde em juros compostos a 100% do CDI.',
      items: [
        'Simulação instantânea de impacto no patrimônio',
        'Cálculo de custo de oportunidade a 100% do CDI',
        'Projeção temporal de 1, 3 e 5 anos',
        'Classificação de impacto sistêmico (Baixo, Médio, Crítico)',
        'Integração direta com suas metas de poupança'
      ],
      previewTitle: 'Simulador Efeito Borboleta',
      metricLabel: 'Custo de Oportunidade (5 anos)',
      metricVal: 'R$ 14.820,00',
      metricBadge: 'Taxa CDI: 10.5% a.a.',
      cardTag: 'Motor de Inteligência'
    },
    {
      id: 'vampire',
      headline: 'Detector de Assinaturas Vampiro & Inflação',
      description: 'Audite todos os seus serviços recorrentes, detecte aumentos silenciosos de mensalidades e receba links diretos para cancelar o que não usa.',
      items: [
        'Auditoria automática de drenos de streaming e apps',
        'Nota de saúde financeira de A até D',
        'Cálculo de dias de trabalho drenados no ano',
        'Alerta de aumento oculto de preço na fatura',
        'Atalho com 1 clique para página de cancelamento'
      ],
      previewTitle: 'Auditoria de Assinaturas Vampiro',
      metricLabel: 'Dreno Anual Identificado',
      metricVal: 'R$ 2.450,00',
      metricBadge: 'Nota de Saúde: B (Bom)',
      cardTag: 'Auditoria Anti-Desperdício'
    },
    {
      id: 'couple',
      headline: 'Modo Casal com Acerto de Contas & Pix',
      description: 'Divida despesas compartilhadas sem constrangimento. O app calcula quem deve a quem com proporção justa e permite liquidação em segundos via Pix.',
      items: [
        'Espaço compartilhado sem misturar contas privadas',
        'Divisão percentual justa (50/50 ou proporcional à renda)',
        'Cálculo automático de saldo líquido devedor',
        'Liquidação facilitada com QR Code Pix',
        'Histórico transparente de acertos passados'
      ],
      previewTitle: 'Acerto de Contas Modo Casal',
      metricLabel: 'Saldo Líquido Devedor',
      metricVal: 'R$ 340,50 a receber',
      metricBadge: 'Acerto Pendente: Parceiro(a)',
      cardTag: 'Finanças em Dupla'
    }
  ];

  // Alternância das Abas de Features
  const featureTabs = document.querySelectorAll('.feature-tab-button');
  const featHeadline = document.getElementById('featHeadline');
  const featDescription = document.getElementById('featDescription');
  const featList = document.getElementById('featList');
  const featPreviewTitle = document.getElementById('featPreviewTitle');
  const featMetricLabel = document.getElementById('featMetricLabel');
  const featMetricVal = document.getElementById('featMetricVal');
  const featMetricBadge = document.getElementById('featMetricBadge');
  const featCardTag = document.getElementById('featCardTag');

  window.selectFeature = function(index) {
    featureTabs.forEach((tab, i) => {
      if (i === index) {
        tab.className = 'feature-tab-button inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold bg-[#00E699] text-slate-950 shadow-lg shadow-emerald-500/20 transition-all';
      } else {
        tab.className = 'feature-tab-button inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border border-slate-800 bg-[#0F1422] text-slate-300 hover:border-emerald-500/40 hover:text-white transition-all';
      }
    });

    const data = featuresData[index];
    if (!data) return;

    if (featHeadline) featHeadline.textContent = data.headline;
    if (featDescription) featDescription.textContent = data.description;
    if (featPreviewTitle) featPreviewTitle.textContent = data.previewTitle;
    if (featMetricLabel) featMetricLabel.textContent = data.metricLabel;
    if (featMetricVal) featMetricVal.textContent = data.metricVal;
    if (featMetricBadge) featMetricBadge.textContent = data.metricBadge;
    if (featCardTag) featCardTag.textContent = data.cardTag;

    if (featList) {
      featList.innerHTML = data.items.map(item => `
        <li class="flex items-center gap-3 text-sm text-slate-300">
          <i data-lucide="check-circle-2" class="w-4 h-4 flex-shrink-0 text-[#00E699]"></i>
          <span>${item}</span>
        </li>
      `).join('');
      if (window.lucide) lucide.createIcons();
    }
  };

  // 4. Seletor de Planos Mensal / Anual (-20% OFF)
  const billingMonthlyBtn = document.getElementById('billingMonthlyBtn');
  const billingAnnualBtn = document.getElementById('billingAnnualBtn');
  const proPrice = document.getElementById('proPrice');
  const proSub = document.getElementById('proSub');
  const couplePrice = document.getElementById('couplePrice');
  const coupleSub = document.getElementById('coupleSub');

  if (billingMonthlyBtn && billingAnnualBtn) {
    billingMonthlyBtn.addEventListener('click', () => {
      billingMonthlyBtn.className = 'rounded-lg px-4 py-2 text-sm font-bold bg-emerald-500/20 text-[#00E699] border border-emerald-500/40 shadow transition-all';
      billingAnnualBtn.className = 'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-all';
      
      if (proPrice) proPrice.textContent = 'R$ 19,90';
      if (proSub) proSub.textContent = '/mês cobrado mensalmente';
      if (couplePrice) couplePrice.textContent = 'R$ 29,90';
      if (coupleSub) coupleSub.textContent = '/mês cobrado mensalmente';
    });

    billingAnnualBtn.addEventListener('click', () => {
      billingAnnualBtn.className = 'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold bg-emerald-500/20 text-[#00E699] border border-emerald-500/40 shadow transition-all';
      billingMonthlyBtn.className = 'rounded-lg px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-all';
      
      if (proPrice) proPrice.textContent = 'R$ 15,90';
      if (proSub) proSub.textContent = '/mês (faturado R$ 190,80/ano)';
      if (couplePrice) couplePrice.textContent = 'R$ 23,90';
      if (coupleSub) coupleSub.textContent = '/mês (faturado R$ 286,80/ano)';
    });
  }

  // 5. Accordion de FAQ
  document.querySelectorAll('.faq-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const wasActive = parent.classList.contains('active');

      // Fecha todos os outros
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Se não estava ativo, abre
      if (!wasActive) {
        parent.classList.add('active');
      }
    });
  });
});
