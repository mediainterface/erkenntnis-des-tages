import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { Home } from '@/features/home/presentation/Home.tsx'
import { WinningPage } from '@/features/winningPage/presentation/WinningPage.tsx'
import { supabase } from '@/supabase'
import { RouteObject, createBrowserRouter, redirect } from 'react-router-dom'
import { getUserProfile } from '../auth/helper/profile.helper'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { CompleteProfile } from '../completeProfile/presentation/CompleteProfile'
import { CreatePoll } from '../createPoll/presentation/CreatePoll'
import { VotesResult } from '../result/presentation/VotesResult'
import { Vote } from '../vote/presentation/Vote'
import { OpenPolls } from '../openPolls/presentation/OpenPolls'
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
      { path: ROUTING_PATH.openPolls, element: <OpenPolls /> },
      {
        path: ROUTING_PATH.winningPage,
        element: <WinningPage />,
      },
      {
        path: ROUTING_PATH.completeProfile,
        element: <CompleteProfile />,
        loader: async () => {
          const profile = await getUserProfile()
          return profile ? redirect(ROUTING_PATH.home) : null
        },
      },
      {
        path: ROUTING_PATH.vote,
        element: <Vote />,
        loader: async ({ params }) => {
          const { data, error } = await supabase.from(TABLE_NAME.polls).select().eq('id', params.pollId).maybeSingle()
          if (!data || error) {
            alert('Umfrage konnte nicht gefunden werden')
            return redirect(ROUTING_PATH.home)
          }
          const pollResponse = data as Poll

          if (pollResponse.is_closed) {
            alert('Umfrage ist bereits abgeschlossen')
          }
          return pollResponse.is_closed ? redirect(ROUTING_PATH.home) : null
        },
      },
      {
        path: ROUTING_PATH.result,
        element: <VotesResult />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
