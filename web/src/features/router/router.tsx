import { Home } from '@/features/home/presentation/Home.tsx'
import { WinningPage } from '@/features/winningPage/presentation/WinningPage.tsx'
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import { getUserProfile } from '../auth/helper/profile.helper'
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
        path: ROUTING_PATH.winningPage,
        element: <WinningPage />,
      },
      {
        path: ROUTING_PATH.completeProfile,
        element: <CompleteProfile />,
        loader: async () => {
          const profile = await getUserProfile()
          return profile ? <Navigate to={ROUTING_PATH.home} /> : null
        },
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
