import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { Home } from '@/features/home/presentation/Home.tsx'
import { supabase } from '@/supabase'
import { message } from 'antd'
import { RouteObject, createBrowserRouter, redirect } from 'react-router-dom'
import { getUserProfile } from '../auth/helper/profile.helper'
import { AuthProvider } from '../auth/presentation/AuthProvider'
import { CompleteProfile } from '../completeProfile/presentation/CompleteProfile'
import { CreatePoll } from '../createPoll/presentation/CreatePoll'
import { Result } from '../result/presentation/Result'
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
        loader: async () => {
          const profile = await getUserProfile()
          return profile ? redirect(ROUTING_PATH.home) : null
        },
      },
      {
        path: ROUTING_PATH.vote,
        element: <Vote />,
        loader: async ({ params }) => {
          const [messageApi] = message.useMessage()
          const { data, error } = await supabase.from(TABLE_NAME.polls).select().eq('id', params.pollId).maybeSingle()
          if (!data || error) {
            messageApi.open({ type: 'error', content: 'Umfrage konnte nicht gefunden werden' })
            return redirect(ROUTING_PATH.home)
          }
          const pollResponse = data as Poll

          if (pollResponse.is_closed) {
            messageApi.open({ type: 'error', content: 'Umfrage ist bereits abgeschlossen' })
          }
          return pollResponse.is_closed ? redirect(ROUTING_PATH.home) : null
        },
      },
      {
        path: ROUTING_PATH.result,
        element: <Result />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

