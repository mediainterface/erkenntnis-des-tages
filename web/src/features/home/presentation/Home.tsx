import { PERSON_X_EMAIL } from '@/common/constants/person-x-email.constants'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { useUserStore } from '@/stores/useUserStore.tsx'
import { Button, Card, Flex, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home: React.FC = () => {
  const { user, userProfile } = useUserStore()
  const navigate = useNavigate()

  const handleCreatePoll = () => {
    navigate(ROUTING_PATH.createPoll)
  }

  const userName = userProfile?.username
  const greeting = user?.email === PERSON_X_EMAIL ? 'Bonjour' : 'Hallo'
  const greetingText = `${greeting} ${userName}`
  return (
    <Card>
      <Flex vertical align={'center'} gap={'large'}>
        <Typography.Text>{greetingText}</Typography.Text>
        <Typography.Text>Heute darf ... das Meeting leiten!</Typography.Text>
        <div style={{ maxWidth: '250px' }}>
          <img src="https://cdn-icons-png.flaticon.com/128/3468/3468306.png" alt={'unicorn'} />
        </div>
        <Button type={'primary'} onClick={handleCreatePoll}>
          Umfrage erstellen
        </Button>
      </Flex>
    </Card>
  )
}
