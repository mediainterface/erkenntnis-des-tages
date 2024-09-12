import { useUserStore } from '@/stores/useUserStore.tsx'
import { Card, Flex, Typography } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React from 'react'

export const UserProfile: React.FC = () => {
  const userProfile = useUserStore((state) => state.userProfile)

  if (!userProfile) return null
  console.log(userProfile)

  return (
    <Flex style={{ justifyContent: 'center', alignItems: 'start', paddingTop: '5rem' }}>
      <Card style={{ width: 300 }}>
        <Flex align="center" gap={'large'}>
          <Avatar size={80} src={userProfile?.avatar_url} />
          <Flex vertical gap={'middle'}>
            <Flex gap={'large'}>
              <Typography.Text>Username:</Typography.Text>
              <Typography.Text>{userProfile.username}</Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}
