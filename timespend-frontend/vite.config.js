import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'    // is code likhny ka maqsad hai k jb bhi apllication kise bhi port
      // par open ho to usko is port k sath replace kar de
    },
  },

  plugins: [
    tailwindcss(),
    react()
  ],
})
