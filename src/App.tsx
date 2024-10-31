import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'
import GTM from 'react-gtm-module';
import { env } from './env'



const gtmId = env.TAG_MANAGER;

const tagManagerArgs = {
  gtmId: gtmId,
};

GTM.initialize(tagManagerArgs);
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
