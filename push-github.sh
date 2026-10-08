#!/bin/bash
set -e

echo "🚀 Iniciando envio do projeto Finanças para o GitHub..."

# 1. Adicionar todas as alterações
echo "📦 Adicionando arquivos..."
git add .

# 2. Criar commit se houver alterações
if git diff-index --quiet HEAD --; then
  echo "ℹ️ Nenhuma alteração pendente para commit."
else
  echo "💾 Criando commit..."
  git commit -m "feat(app): migracao para React 18, TypeScript e Vite com integracao ao @financas/core"
fi

# 3. Garantir branch main
git branch -M main

# 4. Enviar para o repositório remoto
echo "🌐 Enviando para o GitHub (origin main)..."
git push -u origin main

echo "✅ Projeto enviado com sucesso para o GitHub!"
