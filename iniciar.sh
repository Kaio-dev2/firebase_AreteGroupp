#!/bin/bash
echo "🚀 Arete Groupp — iniciando ambiente de desenvolvimento"
echo ""

# Garante que não há cache corrompido
rm -rf .next

# Verifica Node.js
NODE_VER=$(node -v 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VER" ] || [ "$NODE_VER" -lt 18 ]; then
  echo "⚠️  Node.js 18+ é necessário. Versão atual: $(node -v 2>/dev/null || echo 'não encontrado')"
  echo "   Instale com: nvm install 18 && nvm use 18"
  exit 1
fi
echo "✓ Node.js $(node -v)"

# Instala dependências se necessário
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências..."
  npm install
fi

echo "✓ Dependências prontas"
echo ""
echo "🌐 Abrindo em: http://localhost:9002"
echo ""
npm run dev
