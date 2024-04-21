import { Home } from '@/features/home/presentation/Home.tsx'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { ROUTING_PATH } from './domain/constants/routing-path.constants'

const routes: RouteObject[] = [
  {
    element: <AuthProvider />,
    children: [
      {
        path: ROUTING_PATH.home,
        element: <Home />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
