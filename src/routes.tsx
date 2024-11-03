import { createBrowserRouter } from 'react-router-dom'
import BuscarCursos from './pages/BuscarCursos'
import Home from './pages/Home'
import { AppLayout } from './pages/_layouts/app'
import PersonalInfo from './pages/CadastrarAluno/personalinfo'
import AddressPage from './pages/CadastrarAluno/address'
import SuccessPage from './pages/CadastrarAluno/realizada'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/buscar-cursos', element: <BuscarCursos /> },
      { path: '/checkout/cadastrar-aluno', element: <PersonalInfo /> },
      { path: '/checkout/endereco', element: <AddressPage /> },
      { path: '/checkout/information', element: <SuccessPage /> },

    ],
  }

])
