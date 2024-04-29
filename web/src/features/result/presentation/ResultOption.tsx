import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import { Flex, Form, Space } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import Typography from 'antd/es/typography/Typography'
import React from 'react'
import { PollResult } from '../domain/type/poll-result.type'

export const ResultOption: React.FC<PollResult> = (props) => {
  const { content, user_id, votes } = props

  const [profile, setProfile] = React.useState<Profile | null>(null)

  const getUser = React.useCallback(async () => {
    const { data } = await supabase.from(TABLE_NAME.profiles).select().eq('user_id', user_id).maybeSingle()
    if (data) {
      setProfile(data as Profile)
    }
  }, [user_id])

  React.useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <Form.Item>
      <Flex justify="flex-start" align="center">
        <Space size={10}>
          <Avatar size="large" src={profile?.avatar_url} />
          <Typography>
            [Stimmen: {votes}]: ({profile?.username}) {content}
          </Typography>
        </Space>
      </Flex>
    </Form.Item>
  )
}

