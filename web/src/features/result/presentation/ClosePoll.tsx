import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { useUserStore } from '@/stores/user.store'
import { supabase } from '@/supabase'
import { Button, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type ClosePollProps = Pick<Poll, 'id'>

export const ClosePoll: React.FC<ClosePollProps> = (props) => {
  const { id } = props
  const [isPollCreator, setIsPollCreator] = React.useState(false)
  const user = useUserStore((state) => state.user)
  const [messageApi] = message.useMessage()
  const [hasClickedClose, setHasClickedClose] = React.useState(false)
  const navigate = useNavigate()

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
    setHasClickedClose(true)
    const { error } = await supabase.from(TABLE_NAME.polls).update({ is_closed: true }).eq('id', id)
    if (error) {
      messageApi.error({ content: 'Umfrage konnte nicht geschlossen werden' })
    } else {
      messageApi.success({ content: 'Umfrage wurde erfolgreich geschlossen' })
    }
    setHasClickedClose(false)
    navigate(ROUTING_PATH.home)
  }

  return (
    isPollCreator && (
      <Button onClick={handleClosePollClick} loading={hasClickedClose}>
        Umfrage schließen
      </Button>
    )
  )
}

