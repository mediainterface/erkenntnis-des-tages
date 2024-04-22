import { supabase } from '@/supabase.tsx'
import { User } from '@supabase/supabase-js'
import { Card, Flex, Typography } from 'antd'
import React from 'react'

export const Home: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null)
  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data) {
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  const userName = user?.email ?? 'keine EMail'
  const greeting = user?.email === 'griebner@mediainterface.de' ? 'Bonjour' : 'Hello'
  const greetingText = `${greeting} ${userName}`
  return (
    <Card>
      <Flex vertical align={'center'} gap={'large'}>
        <Typography.Text>{greetingText}</Typography.Text>
        <div style={{ maxWidth: '250px' }}>
          <img src="https://cdn-icons-png.flaticon.com/128/3468/3468306.png" alt={'unicorn'} />
        </div>
      </Flex>
    </Card>
  )
}
