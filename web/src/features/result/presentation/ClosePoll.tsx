import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { useUserStore } from '@/stores/user.store'
import { supabase } from '@/supabase'
import { Button, message } from 'antd'
import React from 'react'

type ClosePollProps = Pick<Poll, 'id'>

export const ClosePoll: React.FC<ClosePollProps> = (props) => {
  const { id } = props
  const [isPollCreator, setIsPollCreator] = React.useState(false)
  const user = useUserStore((state) => state.user)
  const [messageApi] = message.useMessage()

  const getPollCreator = React.useCallback(async () => {
    const { data, error } = await supabase.from(TABLE_NAME.polls).select().eq('id', id).maybeSingle()
    if (!data || error) {
      return
    }

    const pollResponse = data as Poll
    setIsPollCreator(pollResponse.user_id === user?.id)
  }, [id, user?.id])

  React.useEffect(() => {
    getPollCreator()
  }, [getPollCreator])

  const handleClosePollClick = async () => {
    const { error } = await supabase.from(TABLE_NAME.polls).update({ is_closed: true }).eq('id', id)
    if (error) {
      messageApi.error({ content: 'Umfrage konnte nicht geschlossen werden' })
      return
    }
    messageApi.success({ content: 'Umfrage wurde erfolgreich geschlossen' })
  }

  return isPollCreator && <Button onClick={handleClosePollClick}>Umfrage schließen</Button>
}

