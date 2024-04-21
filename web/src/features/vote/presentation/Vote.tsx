import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { PollOption } from '@/common/types/tables/poll_options/poll-option.type'
import { PollVote } from '@/common/types/tables/poll_votes/poll-vote.type'
import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'
import { Button, RadioChangeEvent, Space, Spin } from 'antd'
import Radio from 'antd/es/radio/radio'
import React from 'react'
import { useParams } from 'react-router-dom'

type SelectedOption = Pick<PollVote, 'poll_option_id'> & {
  index: number
}

export const Vote: React.FC = () => {
  const [selectedOption, setSelectedOption] = React.useState<SelectedOption>({ index: 0, poll_option_id: '' })
  const [pollOptions, setPollOptions] = React.useState<PollOption[]>([])
  const { pollId = '' } = useParams()
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

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
    console.log('newVote', newVote)
    const { data, error } = await supabase.from(TABLE_NAME.votes).insert(newVote).select()
    console.log('data', data)
    if (!data || error) {
      console.error(error)
      return
    }
    alert('Vote successfully added')
  }

  return pollOptions.length === 0 ? (
    <Spin size="large" />
  ) : (
    <>
      <Radio.Group onChange={onChange} value={selectedOption.index}>
        <Space direction="vertical">
          {pollOptions.map((option, index) => (
            <Radio value={index} key={option.user_id}>
              {option.content}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      <br />
      <Button onClick={onSetVote}>Vote</Button>
    </>
  )
}

