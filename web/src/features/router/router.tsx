import { Home } from '@/features/home/presentation/Home.tsx'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { CompleteProfile } from '../completeProfile/presentation/CompleteProfile'
import { CreatePoll } from '../createPoll/presentation/CreatePoll'
import { OpenPolls } from '../openPolls/presentation/OpenPolls'
import { VotesResult } from '../result/presentation/VotesResult'
import { Vote } from '../vote/presentation/Vote'
import { ROUTING_PATH } from './domain/constants/routing-path.constants'
import { completeProfileLoader } from './loader/complete-profile-loader'
import { pollLoader } from './loader/poll-loader'
import { voteLoader } from './loader/vote-loader'

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
      { path: ROUTING_PATH.openPolls, element: <OpenPolls /> },
      {
        loader: pollLoader,
        children: [
          {
            path: ROUTING_PATH.vote,
            element: <Vote />,
            loader: voteLoader,
          },
          {
            path: ROUTING_PATH.result,
            element: <VotesResult />,
          },
        ],
      },
      {
        path: ROUTING_PATH.completeProfile,
        element: <CompleteProfile />,
        loader: completeProfileLoader,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

