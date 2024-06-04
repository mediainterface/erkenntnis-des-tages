import { Poll } from '@/common/types/tables/polls/poll.type'
import { Flex } from 'antd'
import React from 'react'
import { PollCard } from './PollCard'

type PollsProps = {
  polls: Poll[]
}

export const Polls: React.FC<PollsProps> = (props) => {
  const { polls } = props

  return (
    <Flex vertical align={'center'} gap={'large'}>
      <Flex wrap={'wrap'} justify={'center'} gap={'large'}>
        {polls.map((poll) => (
          <PollCard poll={poll} />
        ))}
      </Flex>
    </Flex>
  )
}
