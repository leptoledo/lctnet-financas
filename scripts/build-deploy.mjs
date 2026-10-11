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

// 2. Se apps/app/dist já tem a estrutura unificada, copiar diretamente
if (fs.existsSync(appDistDir)) {
  fs.cpSync(appDistDir, distDir, { recursive: true });
  console.log('✅ Estrutura unificada copiada de apps/app/dist para dist/');
} else {
  // Fallback caso apps/app/dist ainda não tenha rodado
  if (fs.existsSync(landingPublicDir)) {
    fs.cpSync(landingPublicDir, distDir, { recursive: true });
    console.log('✅ Landing Page copiada para dist/ (rota principal /)');
  }
}

// 3. Garantir que a Landing Page esteja na raiz de dist/
if (fs.existsSync(landingPublicDir)) {
  fs.cpSync(landingPublicDir, distDir, { recursive: true });
}

console.log('✨ Build de produção pronto para a Vercel:');
console.log('   🔗 /    -> Landing Page oficial');
console.log('   🔗 /app -> Aplicação Finanças');
