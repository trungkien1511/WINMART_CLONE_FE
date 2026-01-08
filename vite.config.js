import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

// Tạo lại __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@components': path.resolve(__dirname, './src/components'),
            '@validations': path.resolve(__dirname, './src/validations'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@features': path.resolve(__dirname, './src/features'),
            '@styles': path.resolve(__dirname, './src/styles')
        }
    }
});
