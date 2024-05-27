import { DateFormat } from '@/common/components/date/DateFormat'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { FormOutlined, PieChartOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Tooltip } from 'antd'
import { generatePath, useNavigate } from 'react-router-dom'
import React from "react";

type PollCardProps = {
  poll: Poll
}

export const PollCard: React.FC<PollCardProps> = (props) => {
  const { poll } = props
  const navigate = useNavigate()

  const handlePollClick = () => {
    navigate(generatePath(poll.is_closed ? ROUTING_PATH.result : ROUTING_PATH.vote, { pollId: poll.id }))
  }

  return (
    <Card
      style={{ width: '300px', borderColor: poll.is_closed ? 'var(--ant-color-primary-active)' : 'inherit' }}
      key={poll.id}
    >
      <Flex justify="space-between" align="center">
        <DateFormat date={new Date(poll.created_at)} />
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

