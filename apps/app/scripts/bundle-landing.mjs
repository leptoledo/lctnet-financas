import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(appDir, '../..');
const appDistDir = path.join(appDir, 'dist');
const landingPublicDir = path.join(rootDir, 'apps', 'landing', 'public');
const rootDistDir = path.join(rootDir, 'dist');

console.log('🚀 [Post-Build] Integrando Landing Page e Web App...');

// 1. Garantir que a Landing Page seja copiada para a raiz de apps/app/dist/
if (fs.existsSync(landingPublicDir)) {
  fs.cpSync(landingPublicDir, appDistDir, { recursive: true });
  console.log('✅ Landing Page integrada em apps/app/dist/ (raiz /)');
} else {
  console.error('❌ Diretório landing não encontrado:', landingPublicDir);
}

// 2. Duplicar pasta assets para a raiz também (dist/assets) para tolerância a falhas de caminhos relativos/absolutos
const appAssetsDir = path.join(appDistDir, 'app', 'assets');
const fallbackAssetsDir = path.join(appDistDir, 'assets');
if (fs.existsSync(appAssetsDir)) {
  fs.cpSync(appAssetsDir, fallbackAssetsDir, { recursive: true });
  console.log('✅ Assets duplicados em apps/app/dist/assets para suporte universal');
}

// 3. Sincronizar com o root dist/ caso Vercel rode a partir da raiz
try {
  if (!fs.existsSync(rootDistDir)) {
    fs.mkdirSync(rootDistDir, { recursive: true });
  }
  fs.cpSync(appDistDir, rootDistDir, { recursive: true });
  console.log('✅ Pacote unificado sincronizado em dist/ da raiz');
} catch (err) {
  console.warn('⚠️ Sincronização secundária com root ignorada:', err.message);
}

console.log('✨ Build estruturado com sucesso:');
console.log('   🔗 /    -> Landing Page oficial');
console.log('   🔗 /app -> Web App Financeiro');
