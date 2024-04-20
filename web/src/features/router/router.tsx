import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { Home } from '../home/presentation/Home'
import { ROUTING_PATH } from './domain/constants/routing-path.constants'

const routes: RouteObject[] = [
  {
    path: ROUTING_PATH.home,
    element: <Home />,
  },
]

export const router = createBrowserRouter(routes)

