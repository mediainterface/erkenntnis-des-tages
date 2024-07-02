import { DateFormat } from '@/common/components/date/DateFormat'
import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { supabase } from '@/supabase'
import { FormOutlined, PieChartOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Tooltip } from 'antd'
import { parseISO } from 'date-fns'
import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

type PollCardProps = {
  poll: Poll
}

export const PollCard: React.FC<PollCardProps> = (props) => {
  const { poll } = props
  const navigate = useNavigate()

  const [profile, setProfile] = React.useState<Profile | null>(null)

  const getUser = React.useCallback(async () => {
    const { data } = await supabase.from(TABLE_NAME.profiles).select().eq('user_id', poll.user_id).maybeSingle()
    if (data) {
      setProfile(data as Profile)
    }
  }, [poll.user_id])

  React.useEffect(() => {
    getUser()
  }, [getUser])

  const handlePollClick = () => {
    navigate(generatePath(poll.is_closed ? ROUTING_PATH.result : ROUTING_PATH.vote, { pollId: poll.id }))
  }

  return (
    <Card
      style={{ width: '300px', borderColor: poll.is_closed ? 'var(--ant-color-primary-active)' : 'inherit' }}
      key={poll.id}
    >
      <Flex justify="space-between" align="center">
        <Tooltip title={profile?.username}>
          <Avatar size="large" src={profile?.avatar_url} />
        </Tooltip>
        <DateFormat date={parseISO(poll.created_at)} />
        <Tooltip title={poll.is_closed ? 'Ergebnisse' : 'Abstimmen'}>
          <Button
            type="primary"
            shape="circle"
            icon={poll.is_closed ? <PieChartOutlined /> : <FormOutlined />}
            onClick={handlePollClick}
          />
        </Tooltip>
      </Flex>
    </Card>
  )
}
