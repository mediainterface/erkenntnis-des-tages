import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { Home } from '../home/presentation/Home'
import { Login } from '../login/presentation/Login'
import { ROUTING_PATH } from './domain/constants/routing-path.constants'

const routes: RouteObject[] = [
  {
    element: <Login />,
    children: [
      {
        path: ROUTING_PATH.home,
        element: <Home />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

