#!/bin/bash
set -e

echo "🚀 Iniciando faxina e sincronização com o GitHub..."

# 1. Remover arquivos e pastas legadas que infacionam HTML/JS antigo no GitHub
echo "🧹 Removendo pastas legadas e duplicatas..."
git rm -rf --ignore-unmatch app app-web-android landing-page apps/app/public/index.html apps/app/public/app.js apps/app/public/style.css index.html 2>/dev/null || true
rm -rf app app-web-android landing-page apps/app/public/index.html apps/app/public/app.js apps/app/public/style.css index.html 2>/dev/null || true

# 2. Adicionar arquivos modernos do monorepo (ignorando subpasta nativa financas)
echo "📦 Adicionando arquivos modernos do monorepo..."
git add apps packages scripts vercel.json package.json push-github.sh .gitignore 2>/dev/null || git add .

# 3. Criar commit de alterações pendentes se houver
if git diff --cached --quiet; then
  echo "ℹ️ Nenhuma nova alteração nos arquivos para commit (já commitado)."
else
  echo "💾 Criando commit com o redesign visual oficial NexusHR (#00E699)..."
  git commit -m "feat(landing): redesign visual oficial NexusHR (#00E699, grid bg, mockup e layout)"
fi

# 4. Enviar para o repositório remoto
echo "🌐 Enviando para o GitHub (origin main)..."
git push -u origin main

echo "✅ Concluído com sucesso! Repositório 100% sincronizado com o GitHub."
