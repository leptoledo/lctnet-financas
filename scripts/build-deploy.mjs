import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const landingPublicDir = path.join(rootDir, 'apps', 'landing', 'public');
const appDistDir = path.join(rootDir, 'apps', 'app', 'dist');

console.log('🏗️  Montando pacote de deploy unificado para a Vercel...');

// 1. Limpar e recriar diretório dist na raiz
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copiar Landing Page para a raiz de dist/ (para responder na rota /)
if (fs.existsSync(landingPublicDir)) {
  fs.cpSync(landingPublicDir, distDir, { recursive: true });
  console.log('✅ Landing Page copiada para dist/ (rota principal /)');
} else {
  console.error('❌ Diretório da Landing Page não encontrado:', landingPublicDir);
}

// 3. Copiar App React compilado para dist/app/ (para responder na rota /app)
const appTargetDir = path.join(distDir, 'app');
if (fs.existsSync(appDistDir)) {
  fs.mkdirSync(appTargetDir, { recursive: true });
  fs.cpSync(appDistDir, appTargetDir, { recursive: true });
  console.log('✅ App React 18 copiado para dist/app/ (rota /app)');
} else {
  console.error('❌ Diretório compilado do App não encontrado:', appDistDir);
}

console.log('✨ Build de produção pronto para a Vercel:');
console.log('   🔗 /    -> Landing Page oficial');
console.log('   🔗 /app -> Aplicação Finanças');
