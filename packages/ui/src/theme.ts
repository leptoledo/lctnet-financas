/**
 * @financas/ui - Design Tokens & Theme
 * Tradução fiel de DesignSystemAppTheme.swift para o ecossistema Web/Android/iOS
 */

export const AppThemeTokens = {
  colors: {
    income: '#10B981',
    incomeDark: '#059669',
    incomeGlow: 'rgba(16, 185, 129, 0.25)',

    expense: '#EF4444',
    expenseDark: '#DC2626',
    expenseGlow: 'rgba(239, 68, 68, 0.25)',

    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryGlow: 'rgba(37, 99, 235, 0.35)',

    secondary: '#7C3AED',
    secondaryHover: '#6D28D9',

    dark: {
      background: '#0B0F19',
      card: 'rgba(17, 24, 39, 0.75)',
      glass: 'rgba(30, 41, 59, 0.6)',
      border: 'rgba(255, 255, 255, 0.08)',
      textMain: '#F9FAFB',
      textSecondary: '#9CA3AF',
      textMuted: '#6B7280'
    },

    light: {
      background: '#F3F4F6',
      card: 'rgba(255, 255, 255, 0.85)',
      glass: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(209, 213, 219, 0.6)',
      textMain: '#111827',
      textSecondary: '#4B5563',
      textMuted: '#9CA3AF'
    }
  },

  gradients: {
    income: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    expense: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    primary: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
    heroRadial: 'radial-gradient(circle at 50% 10%, rgba(37, 99, 235, 0.18) 0%, rgba(124, 58, 237, 0.08) 35%, transparent 70%)'
  },

  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },

  cornerRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    full: '9999px'
  },

  transitions: {
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
    quick: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  }
};
