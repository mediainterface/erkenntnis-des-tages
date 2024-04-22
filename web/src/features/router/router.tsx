import { Home } from '@/features/home/presentation/Home.tsx'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { CompleteProfile } from '../completeProfile/presentation/CompleteProfile'
import { CreatePoll } from '../createPoll/presentation/CreatePoll'
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
      {
        path: ROUTING_PATH.completeProfile,
        element: <CompleteProfile />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
