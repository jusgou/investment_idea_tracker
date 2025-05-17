import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  // Add this resolve section to fix Firebase imports
  resolve: {
    alias: {
      'firebase/app': 'firebase/app',
      'firebase/auth': 'firebase/auth',
      'firebase/firestore': 'firebase/firestore',
      'firebase/functions': 'firebase/functions',
      'firebase/storage': 'firebase/storage',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
    exclude: ['lucide-react']
  }
});