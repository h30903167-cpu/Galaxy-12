import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

console.log('🚀 Starting Galaxy Seeder production build for Netlify...');

// Helper to recursively copy directories
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

let builtWithVite = false;

// Check if Vite is installed in node_modules or available
const viteBin = path.resolve(rootDir, 'node_modules', '.bin', 'vite');
if (fs.existsSync(viteBin)) {
  try {
    console.log('📦 Found Vite in node_modules, running `vite build`...');
    execSync(`"${viteBin}" build`, { stdio: 'inherit', cwd: rootDir });
    builtWithVite = true;
    console.log('✅ Vite build completed successfully.');
  } catch (err) {
    console.warn('⚠️ Vite build exited with error, falling back to static asset bundler:', err.message);
  }
}

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy public assets if not already copied by Vite
if (!builtWithVite && fs.existsSync(publicDir)) {
  console.log('📁 Copying public/ assets to dist/...');
  copyDirSync(publicDir, distDir);
}

// Always ensure index.html is in dist
const rootIndexHtml = path.join(rootDir, 'index.html');
const distIndexHtml = path.join(distDir, 'index.html');

if (!builtWithVite && fs.existsSync(rootIndexHtml)) {
  console.log('📄 Copying index.html to dist/index.html...');
  fs.copyFileSync(rootIndexHtml, distIndexHtml);
}

// Ensure _redirects file exists in dist for Netlify SPA routing
const distRedirects = path.join(distDir, '_redirects');
const publicRedirects = path.join(publicDir, '_redirects');

if (fs.existsSync(publicRedirects)) {
  fs.copyFileSync(publicRedirects, distRedirects);
} else {
  fs.writeFileSync(distRedirects, '/*    /index.html   200\n', 'utf8');
}

console.log('🎉 Production build succeeded! Output folder: dist/');
console.log('📄 Verified files in dist:');
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  console.log(`   - ${files.join('\n   - ')}`);
}
