import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts (DESIGN.md §3) — no Google request, no layout jump
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource/instrument-sans/400.css'
import '@fontsource/instrument-sans/500.css'
import '@fontsource/instrument-sans/600.css'
import '@fontsource/jetbrains-mono/400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
