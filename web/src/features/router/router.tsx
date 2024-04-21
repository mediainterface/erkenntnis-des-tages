import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { CompleteProfile } from '../completeProfile/presentation/CompleteProfile'
import { CreatePoll } from '../createPoll/presentation/CreatePoll'
import { Home } from '../home/presentation/Home'
import { Vote } from '../vote/presentation/Vote'
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
      {
        path: ROUTING_PATH.vote,
        element: <Vote />,
        loader: async () => {
          //TODO: check if poll is closed
          return null
        },
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

