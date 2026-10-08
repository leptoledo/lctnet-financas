#!/bin/bash
set -e

echo "🚀 Iniciando faxina e sincronização com o GitHub..."

# 1. Remover arquivos e pastas legadas que infacionam HTML/JS antigo no GitHub
echo "🧹 Removendo pastas legadas e duplicatas (app, app-web-android, landing-page, public legado)..."
git rm -rf --ignore-unmatch app app-web-android landing-page apps/app/public/index.html apps/app/public/app.js apps/app/public/style.css 2>/dev/null || true
rm -rf app app-web-android landing-page apps/app/public/index.html apps/app/public/app.js apps/app/public/style.css 2>/dev/null || true

# 2. Adicionar os novos arquivos React 18, TypeScript e configurações
echo "📦 Adicionando arquivos modernos do monorepo..."
git add .

# 3. Criar commit de limpeza
if git diff-index --quiet HEAD --; then
  echo "ℹ️ Nenhuma alteração pendente para commit."
else
  echo "💾 Criando commit de limpeza e modernização..."
  git commit -m "chore(cleanup): remove pastas legadas e padroniza monorepo em React 18 e TypeScript"
fi

# 4. Enviar para o repositório remoto
echo "🌐 Enviando para o GitHub (origin main)..."
git push -u origin main

echo "✅ Concluído com sucesso! O GitHub agora exibirá TypeScript como linguagem principal."
