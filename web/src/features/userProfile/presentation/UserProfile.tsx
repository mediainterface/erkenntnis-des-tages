import { useUserStore } from '@/stores/useUserStore.tsx'
import { UploadOutlined } from '@ant-design/icons'
import { Badge, Card, Descriptions, DescriptionsProps, Flex } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React from 'react'

export const UserProfile: React.FC = () => {
  const userProfile = useUserStore((state) => state.userProfile)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  if (!userProfile) {
    return null
  }
  const handleBadgeClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle the selected file (e.g., upload to server or update avatar URL)
      console.log('Selected file:', file)
    }
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
          <Badge count={<UploadOutlined style={{ cursor: 'pointer' }} onClick={handleBadgeClick} />}>
            <Avatar size={80} src={userProfile.avatar_url} />
          </Badge>
          <Descriptions items={items} title="Infos" />
        </Flex>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*" // Optional: Restrict to image files
        />
      </Card>
    </Flex>
  )
}
