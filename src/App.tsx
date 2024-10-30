import './global.css'
import logo from '../public/logo-white.svg'

import { Helmet, HelmetProvider } from 'react-helmet-async'



export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Bolsa Click" />
      <div className='w-full flex min-h-screen justify-center items-center flex-col antialiased'>
        <img src={logo} alt="React logo" />
      </div>
    </HelmetProvider>
  )
}
