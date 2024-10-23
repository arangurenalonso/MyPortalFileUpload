import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  build: {
    outDir: 'build', // Asegúrate de que sea 'build'
  },
  plugins: [react()],
});
