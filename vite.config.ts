import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <--- Mude aqui (tire o '-oxc')

export default defineConfig({
  plugins: [react()],
})