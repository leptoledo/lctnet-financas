# 🚀 Guia de Arquitetura & Lançamento Multiplataforma: Finanças

Este documento consolida a análise técnica do aplicativo nativo iOS, a arquitetura do **Monorepo Escalável**, os pacotes compartilhados, a aplicação **Web & Android (Capacitor)** e a **Landing Page de Alta Conversão**.

---

## 📁 Estrutura do Monorepo Escalável

```
lctnet-financas/
├── package.json              # Configuração de Workspaces do Monorepo
├── packages/
│   ├── core/                 # Lógica de Negócios, Cálculos e Supabase Client Tipado
│   │   ├── package.json
│   │   └── src/
│   │       ├── types.ts          # Modelos TypeScript (Transaction, Account, SavingGoal, Budget)
│   │       ├── formatters.ts     # Formatadores de moeda (BRL, USD, EUR) e datas
│   │       ├── calculations.ts   # Cálculos de saldo, despesas por categoria e evolução mensal
│   │       ├── seedData.ts       # 70+ transações reais tipadas e parser CSV
│   │       ├── supabaseClient.ts # Conexão com a nuvem Supabase oficial
│   │       └── index.ts
│   │
│   └── ui/                   # Design System & Tokens Compartilhados
│       ├── package.json
│       └── src/
│           ├── theme.ts          # Cores semânticas, Glassmorphism e gradientes (AppTheme.swift)
│           └── index.ts
│
├── apps/
│   ├── app/                  # Aplicação Financeira (Web SPA/PWA & Android com Capacitor)
│   │   ├── package.json
│   │   ├── capacitor.config.json # Configuração oficial para Android (com.lctnet.financas)
│   │   └── public/
│   │       ├── index.html        # Interface completa (Dashboard, Extrato, Contas, Metas, Orçamentos)
│   │       ├── style.css         # Glassmorphism e Dark Theme
│   │       ├── app.js            # Estado reativo, Chart.js interativo e sync Supabase
│   │       ├── manifest.json     # PWA para Android
│   │       └── sw.js             # Suporte offline
│   │
│   └── landing/              # Landing Page de Alta Conversão
│       ├── package.json
│       └── public/
│           ├── index.html        # Página de Vendas com Mockup 3D interativo e badges iOS/Android
│           ├── style.css         # Estética de fintech global
│           └── script.js         # Alternância mensal/anual (-35%), FAQ accordion e mockup
│
├── financas/                 # Aplicativo Nativo iOS (Swift, SwiftUI, SwiftData, Charts)
├── seed.csv                  # Base de dados de 70+ transações reais
├── index.html                # Hub de entrada da aplicação
└── MULTI_PLATFORM_GUIDE.md   # Este guia executivo
```

---

## 💻 1. Comandos do Monorepo

Na raiz do projeto (`/Users/leandrotoledo/Projetos/lctnet-financas`):

```bash
# Iniciar a aplicação Web / Android localmente:
npm run dev:app
# Ou: cd apps/app/public && python3 -m http.server 3000

# Iniciar a Landing Page localmente:
npm run dev:landing
# Ou: cd apps/landing/public && python3 -m http.server 3001

# Sincronizar plugins e arquivos no projeto Android:
npm run cap:sync

# Abrir o projeto diretamente no Android Studio:
npm run cap:android
```

---

## 🤖 2. Compilação e Publicação no Android (Google Play)

O aplicativo está pronto para ser compilado via **Capacitor 6**:

1. **Pré-requisito:** Instale o Android Studio em sua máquina.
2. Na pasta `apps/app`:
   ```bash
   npx cap add android
   npx cap sync
   npx cap open android
   ```
3. O projeto abrirá no Android Studio com:
   - Identificador configurado: `com.lctnet.financas`
   - Permissões biométricas para login por impressão digital / reconhecimento facial.
   - Ícones adaptativos e tela de carregamento (Splash Screen) imersiva no tema escuro.
4. Para gerar o APK ou AAB para a Google Play Store:
   - No Android Studio, vá em **Build > Generate Signed Bundle / APK**.

---

## 🌐 3. Publicação Web (Vercel, Netlify ou Cloudflare Pages)

### Opção 1: Vercel (Recomendada)
1. Instale o CLI da Vercel: `npm i -g vercel`.
2. Para publicar a Landing Page:
   ```bash
   cd apps/landing/public && vercel --prod
   ```
3. Para publicar o Web App:
   ```bash
   cd apps/app/public && vercel --prod
   ```

### Opção 2: Netlify / Cloudflare Pages
Basta apontar a raiz de publicação para `apps/landing/public` ou `apps/app/public`.

---

## ☁️ 4. Sincronização em Nuvem (Supabase)

O cliente compartilhado em [`packages/core/src/supabaseClient.ts`](file:///Users/leandrotoledo/Projetos/lctnet-financas/packages/core/src/supabaseClient.ts) conecta-se com o mesmo banco de dados PostgreSQL do app iOS:
- **URL:** `https://inuboqltymsifipyzrka.supabase.co`
- **Tabelas Espelhadas:** `profiles`, `categories`, `accounts`, `transactions`, `saving_goals`, `budgets` e `budget_items`.
- **Row Level Security (RLS):** Garante isolamento absoluto entre contas de usuários.
