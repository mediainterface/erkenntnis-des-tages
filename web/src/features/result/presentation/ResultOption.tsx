import { Badge, Flex, Form, Tooltip, Typography } from 'antd'
import Avatar from 'antd/es/avatar/avatar'

import { useProfilesStore } from '@/stores/useProfilesStore.tsx'
import React from 'react'
import { PollResult } from '../domain/type/poll-result.type'

export const ResultOption: React.FC<PollResult> = (props) => {
  const { content, user_id, votes } = props
  const { profiles, getProfile } = useProfilesStore((state) => ({
    profiles: state.profiles,
    getProfile: state.getProfile,
  }))

  const profile = profiles[user_id] || null
  console.log(profile)
  React.useEffect(() => {
    if (!profile) {
      getProfile(user_id)
    }
  }, [user_id, profile, getProfile])

  return (
    <Form.Item style={{ transformOrigin: 'left', transform: `scale(1.${votes})` }}>
      <Flex justify="flex-start" align="flex-end" gap={'middle'}>
        <Tooltip title={profile?.username}>
          <Badge count={votes}>
            <Avatar size="large" src={profile?.avatar_url} />
          </Badge>
        </Tooltip>
        <Typography.Title
          level={2}
          style={{
            marginBottom: '0',
            backgroundColor: 'var(--ant-layout-color-bg-body)',
            padding: '0.3rem 0.5rem',
            borderRadius: '10px',
            border: '1px solid var(--ant-color-border-secondary)',
          }}
        >
          {content}
        </Typography.Title>
      </Flex>
    </Form.Item>
  )
}
