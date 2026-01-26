import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerLicense } from '@syncfusion/ej2-base';
import './index.css'
import App from './App.tsx'

import { ContextProvider } from "./contexts/ContextProvider.tsx";

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
)
