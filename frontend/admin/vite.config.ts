import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['modern-store.local'],
    origin: 'https://modern-store.local',
    hmr: {
      host: 'modern-store.local',
      protocol: 'wss',
      clientPort: 443,
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  ssr: {
    noExternal: ['/@syncfusion/']
  }
})
