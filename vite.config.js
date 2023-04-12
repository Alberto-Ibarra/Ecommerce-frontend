import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      PAYPAL_CLIENT_ID: ('Ae-gufHC5Xm-C5NDM70McTGiM85r8Ya1cqLMeklz-RNrQIdeKdH32FX8RAS0Q_vrB72VQMh7SYR2fk6l'),
    },
  },
})
