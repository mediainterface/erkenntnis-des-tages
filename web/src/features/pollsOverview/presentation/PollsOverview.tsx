import { Loader } from '@/common/components/loader/Loader'
import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { supabase } from '@/supabase'
import { Tabs, TabsProps } from 'antd'
import { getTime } from 'date-fns'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Polls } from './Polls'

export const PollsOverview: React.FC = () => {
  const [openPolls, setOpenPolls] = React.useState<Poll[]>([])
  const [closedPolls, setClosedPolls] = React.useState<Poll[]>([])
  // eslint-disable-next-line
  const [_searchParams, setSearchParams] = useSearchParams()
  const searchParamsKey = 'tab'

  supabase
    .channel('supabase_realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: TABLE_NAME.polls,
      },
      (payload) => {
        const newPoll = payload.new as Poll

        if (payload.eventType === 'DELETE') {
          if (newPoll.is_closed) {
            setClosedPolls((state) => state.filter((poll) => poll.id !== payload.old.id))
          } else {
            setOpenPolls((state) => state.filter((poll) => poll.id !== payload.old.id))
          }
          return
        }

        if (newPoll.is_closed) {
          setClosedPolls((state) => [...state, newPoll])
        } else {
          setOpenPolls((state) => [...state, newPoll])
        }
      },
    )
    .subscribe()

  const getPolls = React.useCallback(async () => {
    const { data, error } = await supabase.from(TABLE_NAME.polls).select()
    if (!data || error) {
      return
    }
    const sortedPolls = (data as Poll[]).sort(
      (a, b) => getTime(new Date(b.created_at)) - getTime(new Date(a.created_at)),
    )
    setClosedPolls(sortedPolls.filter((poll) => poll.is_closed))
    setOpenPolls(sortedPolls.filter((poll) => !poll.is_closed))
  }, [])

  React.useEffect(() => {
    getPolls()
  }, [getPolls])

  const onTabChanges = (key: string) => {
    setSearchParams({ [searchParamsKey]: key })
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'open_polls',
      label: 'Offene Umfragen',
      children: <Polls polls={openPolls} />,
    },
    {
      key: 'closed_polls',
      label: 'Abgeschlossene Umfragen',
      children: <Polls polls={closedPolls} />,
    },
  ]

  return openPolls.length === 0 || closedPolls.length === 0 ? (
    <Loader />
  ) : (
    <Tabs centered defaultActiveKey={tabItems[0].key} items={tabItems} onChange={onTabChanges} />
  )
}

