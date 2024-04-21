import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { CreatePoll } from '../createPoll/presentation/CreatePoll'
import { Home } from '../home/presentation/Home'
import { ROUTING_PATH } from './domain/constants/routing-path.constants'

const routes: RouteObject[] = [
  {
    element: <AuthProvider />,
    children: [
      {
        path: ROUTING_PATH.home,
        element: <Home />,
      },
      {
        path: ROUTING_PATH.createPoll,
        element: <CreatePoll />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

