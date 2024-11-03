import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'
import GTM from 'react-gtm-module';
import { router } from './routes'
import { RouterProvider } from 'react-router-dom'


const gtmId = import.meta.env.TAG_MANAGER;

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
        <RouterProvider router={router} />
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  )
}
