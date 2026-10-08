/**
 * Finanças Landing Page Scripts
 * Interatividade, Seletor de Planos e Mockup Dinâmico
 */

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons
  if (window.lucide) lucide.createIcons();

  // 1. Alternância de Planos (Mensal / Anual)
  const billingToggle = document.getElementById('billingToggle');
  const proPriceAmount = document.getElementById('proPriceAmount');
  const proPricePeriod = document.getElementById('proPricePeriod');
  const proBadgeDiscount = document.getElementById('proBadgeDiscount');

  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        // Anual: R$ 14,90/mês cobrado anualmente R$ 179
        proPriceAmount.textContent = 'R$ 14,90';
        proPricePeriod.textContent = '/mês (faturado R$ 178,80/ano)';
        if (proBadgeDiscount) proBadgeDiscount.classList.remove('hidden');
      } else {
        // Mensal: R$ 24,90/mês
        proPriceAmount.textContent = 'R$ 24,90';
        proPricePeriod.textContent = '/mês';
        if (proBadgeDiscount) proBadgeDiscount.classList.add('hidden');
      }
    });
  }

  // 2. Acordeão do FAQ
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.faq-item');
      const isActive = parent.classList.contains('active');

      // Fecha outros
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // 3. Mockup Interativo - Alternar Telas no Celular
  const screenDashboard = document.getElementById('mockupScreenDashboard');
  const screenGoals = document.getElementById('mockupScreenGoals');
  const screenBudgets = document.getElementById('mockupScreenBudgets');

  window.setMockupScreen = function (screenName) {
    document.querySelectorAll('.mockup-tab-btn').forEach(btn => {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('text-gray-400', 'bg-white/5');
    });

    const activeBtn = document.getElementById(`mockupBtn-${screenName}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-blue-600', 'text-white');
      activeBtn.classList.remove('text-gray-400', 'bg-white/5');
    }

    if (screenDashboard) screenDashboard.classList.add('hidden');
    if (screenGoals) screenGoals.classList.add('hidden');
    if (screenBudgets) screenBudgets.classList.add('hidden');

    if (screenName === 'dashboard' && screenDashboard) screenDashboard.classList.remove('hidden');
    if (screenName === 'goals' && screenGoals) screenGoals.classList.remove('hidden');
    if (screenName === 'budgets' && screenBudgets) screenBudgets.classList.remove('hidden');
  };

  // Scroll suave para âncoras
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
