import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { supabase } from '@/supabase.tsx'
import { User } from '@supabase/supabase-js'
import { Button, Card, Flex, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data) {
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  const handleCreatePoll = () => {
    navigate(ROUTING_PATH.createPoll)
  }

  const userName = user?.email ?? 'keine E-Mail'
  const greeting = user?.email === 'griebner@mediainterface.de' ? 'Bonjour' : 'Hello'
  const greetingText = `${greeting} ${userName}`
  return (
    <Card>
      <Flex vertical align={'center'} gap={'large'}>
        <Typography.Text>{greetingText}</Typography.Text>
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
