import { Home } from '@/features/home/presentation/Home.tsx'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { ROUTING_PATH } from './domain/constants/routing-path.constants'

const routes: RouteObject[] = [
  {
    path: ROUTING_PATH.home,
    element: <Home />,
  },
]

export const router = createBrowserRouter(routes)
