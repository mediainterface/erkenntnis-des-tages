import { PollOption } from '@/common/types/tables/poll_options/poll-option.type'
import { supabase } from '@/supabase'
import { RadioChangeEvent, Space, Spin } from 'antd'
import Radio from 'antd/es/radio/radio'
import React from 'react'
import { useParams } from 'react-router-dom'

export const Vote: React.FC = () => {
  const [selectedOption, setSelectedOption] = React.useState(0)
  const [pollOptions, setPollOptions] = React.useState<PollOption[]>([])
  const { pollId = '' } = useParams()

  const getPollOptions = React.useCallback(async () => {
    const { data, error } = await supabase.from('poll_options').select().eq('poll_id', pollId)
    if (!data || error) {
      console.error(error)
      return
    }
    setPollOptions(data as PollOption[])
  }, [pollId])

  React.useEffect(() => {
    getPollOptions()
  }, [getPollOptions])

  const onChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value)
  }

  return pollOptions.length === 0 ? (
    <Spin size="large" />
  ) : (
    <Radio.Group onChange={onChange} value={selectedOption}>
      <Space direction="vertical">
        {pollOptions.map((option, index) => (
          <Radio value={index} key={option.user_id}>
            {option.content}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  )
}

