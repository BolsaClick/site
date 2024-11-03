
import { Outlet } from 'react-router-dom'

import Logos from '../../components/Logos'
import Footer from '../../components/Footer'

export function AppLayout() {

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Logos />
      <Outlet />
      <Footer />

    </div>
  )
}
