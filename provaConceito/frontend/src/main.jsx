import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import Teste from './components/Teste'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Teste />
  </StrictMode>,
)
