/**
 * Finanças Landing Page - Interatividade Estilo NexuHR / NexusOS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Toggle de Planos (Mensal vs Anual)
  const billingToggle = document.getElementById('billingToggle');
  const proPriceAmount = document.getElementById('proPriceAmount');
  const proPricePeriod = document.getElementById('proPricePeriod');
  const familyPriceAmount = document.getElementById('familyPriceAmount');
  const familyPricePeriod = document.getElementById('familyPricePeriod');

  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      if (isAnnual) {
        if (proPriceAmount) proPriceAmount.textContent = 'R$ 23';
        if (proPricePeriod) proPricePeriod.textContent = '/mês faturado anualmente';
        if (familyPriceAmount) familyPriceAmount.textContent = 'R$ 39';
        if (familyPricePeriod) familyPricePeriod.textContent = '/mês faturado anualmente';
      } else {
        if (proPriceAmount) proPriceAmount.textContent = 'R$ 29';
        if (proPricePeriod) proPricePeriod.textContent = '/mês';
        if (familyPriceAmount) familyPriceAmount.textContent = 'R$ 49';
        if (familyPricePeriod) familyPricePeriod.textContent = '/mês';
      }
    });
  }

  // 3. Abas Interativas de Recursos (Estilo NexusOS)
  const featureData = {
    pace: {
      tag: 'Motor de Burn Rate',
      headline: 'Nunca mais seja pego de surpresa no fim do mês',
      description: 'O algoritmo de Ritmo de Gastos calcula a sua queima orçamentária diária ideal e alerta antes que você ultrapasse o teto previsto.',
      bullets: [
        'Cálculo automático de Burn Rate por dia',
        'Indicadores de status: No Ritmo, Atenção e Acelerado',
        'Projeção de saldo no último dia do mês',
        'Conversão de gastos em "Horas de Vida" trabalhadas'
      ],
      mockupTitle: 'Ritmo de Gastos Ativo',
      mockupPaceBadge: 'No Ritmo Ideal',
      mockupBurn: 'R$ 84,20 / dia',
      mockupProjected: 'R$ 2.450,00',
      mockupStatus: 'Consumo dentro do teto estipulado'
    },
    cards: {
      tag: 'Crédito Inteligente',
      headline: 'Domine faturas, limites e compras parceladas',
      description: 'Tenha controle total do seu cartão Black ou Platinum. Saiba exatamente o melhor dia de compra para ganhar até 40 dias de fôlego.',
      bullets: [
        'Melhor Dia de Compra calculado automaticamente',
        'Acompanhamento de parcelamentos (ex: 7/10 parcelas)',
        'Controle de faturas abertas, fechadas e futuras',
        'Previsão de impacto das parcelas no orçamento dos próximos meses'
      ],
      mockupTitle: 'Cartão Black Titanium',
      mockupPaceBadge: 'Melhor Dia: 26',
      mockupBurn: 'Fatura: R$ 1.840,00',
      mockupProjected: 'Limite Disp: R$ 13.160,00',
      mockupStatus: 'Até 40 dias para pagar na fatura seguinte'
    },
    ai: {
      tag: 'Inteligência Artificial',
      headline: 'Efeito Borboleta & Detector de Assinaturas Vampiro',
      description: 'Nossa inteligência preditiva identifica aumentos silenciosos de preço, assinaturas esquecidas e simula o impacto de qualquer gasto a 100% do CDI.',
      bullets: [
        'Simulador Efeito Borboleta em 1, 5 e 10 anos a juros compostos',
        'Detector de drenos de assinaturas (Netflix, Spotify, Academias)',
        'Auditoria de reajustes silenciosos de preço (Price Creep)',
        'Previsão de Fluxo de Caixa a 30 dias com alerta anti-descoberto'
      ],
      mockupTitle: 'Diagnóstico IA • Nota A+',
      mockupPaceBadge: 'Efeito Borboleta 100% CDI',
      mockupBurn: 'Dreno Anual: R$ 1.840,00',
      mockupProjected: 'Economia 5 anos: R$ 14.280,00',
      mockupStatus: '3 assinaturas otimizadas com sucesso'
    },
    couple: {
      tag: 'Modo Casal & Parceria',
      headline: 'Finanças compartilhadas sem cobranças desconfortáveis',
      description: 'Divida despesas da casa na proporção 50/50 ou personalizada com quem você ama. Faça acertos rápidos via Pix em um único clique.',
      bullets: [
        'Espaço compartilhado sem expor suas contas individuais',
        'Cálculo automático de quem deve para quem',
        'Divisão proporcional baseada na renda de cada um',
        'Botão de acerto de contas com registro de comprovante Pix'
      ],
      mockupTitle: 'Espaço Casa & Casal',
      mockupPaceBadge: 'Ana deve a você',
      mockupBurn: 'Saldo Líquido: R$ 510,00',
      mockupProjected: 'Despesas Mês: R$ 2.612,10',
      mockupStatus: 'Tudo equilibrado após última transferência'
    }
  };

  const featureButtons = document.querySelectorAll('.feature-tab-btn');
  const featTag = document.getElementById('featTag');
  const featHeadline = document.getElementById('featHeadline');
  const featDescription = document.getElementById('featDescription');
  const featBullets = document.getElementById('featBullets');
  const featMockupTitle = document.getElementById('featMockupTitle');
  const featMockupBadge = document.getElementById('featMockupBadge');
  const featMockupBurn = document.getElementById('featMockupBurn');
  const featMockupProjected = document.getElementById('featMockupProjected');
  const featMockupStatus = document.getElementById('featMockupStatus');

  featureButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      featureButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-feature');
      const data = featureData[key];
      if (!data) return;

      if (featTag) featTag.textContent = data.tag;
      if (featHeadline) featHeadline.textContent = data.headline;
      if (featDescription) featDescription.textContent = data.description;
      if (featMockupTitle) featMockupTitle.textContent = data.mockupTitle;
      if (featMockupBadge) featMockupBadge.textContent = data.mockupPaceBadge;
      if (featMockupBurn) featMockupBurn.textContent = data.mockupBurn;
      if (featMockupProjected) featMockupProjected.textContent = data.mockupProjected;
      if (featMockupStatus) featMockupStatus.textContent = data.mockupStatus;

      if (featBullets) {
        featBullets.innerHTML = data.bullets.map(bullet => `
          <li class="flex items-start gap-2.5 text-xs text-slate-300">
            <span class="p-1 rounded-full bg-emerald-500/20 text-[#00E699] shrink-0 mt-0.5">
              <svg class="w-3 h-3 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span>${bullet}</span>
          </li>
        `).join('');
      }
    });
  });

  // 4. Acordeão do FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
