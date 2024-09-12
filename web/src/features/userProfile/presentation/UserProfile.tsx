import { useUserStore } from '@/stores/useUserStore.tsx'
import { Card, Descriptions, DescriptionsProps, Flex } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React from 'react'

export const UserProfile: React.FC = () => {
  const userProfile = useUserStore((state) => state.userProfile)

  if (!userProfile) {
    return null
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: userProfile.username,
    },
  ]

  return (
    <Flex style={{ justifyContent: 'center', alignItems: 'start', paddingTop: '5rem' }}>
      <Card style={{ width: 300 }}>
        <Flex align="center" gap={'large'}>
          <div>
            <Avatar size={80} src={userProfile.avatar_url} />
          </div>
          <Descriptions items={items} title="Infos" />
        </Flex>
      </Card>
    </Flex>
  )
}
