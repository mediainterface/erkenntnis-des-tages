import { Home } from '@/features/home/presentation/Home.tsx'
import { RouteObject, createHashRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { CompleteProfile } from '../completeProfile/presentation/CompleteProfile'
import { CreatePoll } from '../createPoll/presentation/CreatePoll'
import { PollsOverview } from '../pollsOverview/presentation/PollsOverview'
import { VotesResult } from '../result/presentation/VotesResult'
import { UserProfile } from '../userProfile/presentation/UserProfile'
import { Vote } from '../vote/presentation/Vote'
import { ROUTING_PATH } from './domain/constants/routing-path.constants'
import { completeProfileLoader } from './loader/complete-profile-loader'
import { resultLoader } from './loader/result-loader'
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
      { path: ROUTING_PATH.pollsOverview, element: <PollsOverview /> },
      {
        path: ROUTING_PATH.vote,
        element: <Vote />,
        loader: voteLoader,
      },
      {
        path: ROUTING_PATH.result,
        element: <VotesResult />,
        loader: resultLoader,
      },
      {
        path: ROUTING_PATH.completeProfile,
        element: <CompleteProfile />,
        loader: completeProfileLoader,
      },
      {
        path: ROUTING_PATH.userProfile,
        element: <UserProfile />,
      },
    ],
  },
]

export const router = createHashRouter(routes)
