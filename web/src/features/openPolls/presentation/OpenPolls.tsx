import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { supabase } from '@/supabase'
import { PieChartOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Tooltip, Typography } from 'antd'
import { format } from 'date-fns/format'
import { getTime } from 'date-fns/fp/getTime'
import React from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

export const OpenPolls: React.FC = () => {
  const [openPolls, setOpenPolls] = React.useState<Poll[]>([])
  const navigate = useNavigate()

  const getOpenPolls = React.useCallback(async () => {
    const { data, error } = await supabase.from(TABLE_NAME.polls).select().eq('is_closed', false)
    if (!data || error) {
      return
    }
    setOpenPolls((data as Poll[]).sort((a, b) => getTime(new Date(b.created_at)) - getTime(new Date(a.created_at))))
  }, [])

  React.useEffect(() => {
    getOpenPolls()
  }, [getOpenPolls])

  const handlePollClick = (pollId: string) => {
    navigate(generatePath(ROUTING_PATH.vote, { pollId }))
  }

  return (
    <Flex vertical align={'center'} gap={'large'}>
      <Typography.Title>Offene Umfragen</Typography.Title>
      {openPolls.map((poll) => (
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Typography style={{ marginRight: '10px' }}>
              {format(new Date(poll.created_at), 'dd.MM.yyyy - H:m:s')}
            </Typography>
            <Tooltip title="Abstimmen">
              <Button
                type="primary"
                shape="circle"
                icon={<PieChartOutlined />}
                onClick={() => handlePollClick(poll.id)}
              />
            </Tooltip>
          </Flex>
        </Form.Item>
      ))}
    </Flex>
  )
}

