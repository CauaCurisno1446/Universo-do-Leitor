import { StrictMode } from 'react'
import { SacolaProvider } from './components/Item.tsx'
import { createRoot } from 'react-dom/client'
import '../src/assets/style/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SacolaProvider>
      <App />
    </SacolaProvider>
  </StrictMode>,
)
