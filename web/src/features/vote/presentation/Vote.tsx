import { DateFormat } from '@/common/components/date/DateFormat.tsx'
import { Loader } from '@/common/components/loader/Loader'
import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { PollOption } from '@/common/types/tables/poll_options/poll-option.type'
import { PollVote } from '@/common/types/tables/poll_votes/poll-vote.type'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { supabase } from '@/supabase'
import { ShareAltOutlined } from '@ant-design/icons'
import { User } from '@supabase/supabase-js'
import { Button, Card, Divider, Flex, Input, Radio, RadioChangeEvent, Space, Tooltip, message } from 'antd'
import React from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'

type SelectedOption = Pick<PollVote, 'poll_option_id'> & {
  index: number
}

export const Vote: React.FC = () => {
  const selectedPollInitSate: SelectedOption = { index: -1, poll_option_id: '' }
  const [selectedOption, setSelectedOption] = React.useState<SelectedOption>(selectedPollInitSate)
  const [pollOptions, setPollOptions] = React.useState<PollOption[]>([])
  const { pollId = '' } = useParams()
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const currentUrl = window.location.href
  const [messageApi] = message.useMessage()
  const [hasVoted, setHasVoted] = React.useState(false)
  const navigate = useNavigate()

  const getPollOptions = React.useCallback(async () => {
    const { data, error } = await supabase.from('poll_options').select().eq('poll_id', pollId)
    if (!data || error) {
      console.error(error)
      return
    }
    setPollOptions(data as PollOption[])
  }, [pollId])

  const getCurrentUser = React.useCallback(async () => {
    const { data, error } = await supabase.auth.getUser()
    if (!data || error) {
      console.error(error)
      return
    }
    setCurrentUser(data.user)
  }, [])

  React.useEffect(() => {
    getPollOptions()
    getCurrentUser()
  }, [getPollOptions, getCurrentUser])

  const onChange = (e: RadioChangeEvent) => {
    const newIndex = e.target.value
    setSelectedOption({ index: newIndex, poll_option_id: pollOptions[newIndex].id })
  }

  const onSetVote = async () => {
    const newVote: PollVote = {
      user_id: currentUser?.id || '',
      poll_id: pollId,
      created_at: new Date().toISOString(),
      poll_option_id: selectedOption.poll_option_id,
    }
    const { data, error } = await supabase.from(TABLE_NAME.votes).insert(newVote).select()
    if (!data || error) {
      console.error(error)
      return
    }
    messageApi.open({
      type: 'success',
      content: 'Erfolgreich abgestimmt',
    })
    setHasVoted(true)
    navigate(generatePath(ROUTING_PATH.result, { pollId: pollId }))
  }

  const onShareClick = () => {
    navigator.clipboard.writeText(currentUrl)
  }

  return pollOptions.length === 0 ? (
    <Loader />
  ) : (
    <Card>
      <Card.Meta
        title={<DateFormat date={new Date(pollOptions[0].created_at)} />}
        description={
          <Flex gap={'small'}>
            <Input defaultValue={currentUrl} disabled={true} />
            <Tooltip title="Copy to Clipboard">
              <Button icon={<ShareAltOutlined />} onClick={onShareClick}>
                Teilen
              </Button>
            </Tooltip>
          </Flex>
        }
      />
      <Divider />
      <Flex vertical gap={'middle'}>
        <Radio.Group onChange={onChange} value={selectedOption.index}>
          <Space direction="vertical">
            {pollOptions.map((option, index) => {
             return (<Radio value={index} key={option.user_id} disabled={option.user_id === currentUser?.id}>
                {option.content}
              </Radio>)})}
          </Space>
        </Radio.Group>
        <Button
          style={{ alignSelf: 'flex-end' }}
          onClick={onSetVote}
          disabled={hasVoted || selectedOption.index === selectedPollInitSate.index}
        >
          Vote
        </Button>
      </Flex>
      <Space.Compact style={{ width: '100%' }}></Space.Compact>
    </Card>
  )
}

