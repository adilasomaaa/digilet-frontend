import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from '@heroui/react'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <ToastProvider placement="top-right" toastOffset={24} />
          <AuthProvider>
            <App />
          </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
