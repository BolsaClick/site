import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'



export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Bolsa Click" />
      <div className="flex min-h-screen flex-col antialiased">
      <Toaster richColors position="top-right" />
        <QueryClientProvider client={queryClient}>
        <Home />
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  )
}
