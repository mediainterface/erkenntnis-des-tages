import { supabase } from '@/supabase'
import { LogoutOutlined } from '@ant-design/icons'
import { User } from '@supabase/supabase-js'
import { Button, Flex, Typography } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import gravatar from 'gravatar'
import React from 'react'

export const NavbarUser: React.FC = () => {
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

  const gravatarUrl = gravatar.url(user?.email ?? '')

  const handleLogOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <Flex align={'flex-start'} justify={'flex-end'}>
        <Typography style={{ color: 'hotpink', marginTop: '5px', marginRight: '15px' }}>{greetingText}</Typography>

        <Avatar src={gravatarUrl} />

        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogOut} style={{ color: 'hotpink' }}>
          Logout
        </Button>
      </Flex>
    </>
  )
}

