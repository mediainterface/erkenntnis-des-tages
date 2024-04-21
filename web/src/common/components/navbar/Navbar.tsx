import { supabase } from '@/supabase'
import { LogoutOutlined } from '@ant-design/icons'
import { User } from '@supabase/supabase-js'
import { Avatar, Button, Flex, Typography } from 'antd'
import gravatar from 'gravatar'
import React from 'react'

export const Navbar: React.FC = () => {
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
  const greeting = 'Hello'
  const text = `${greeting} ${userName}`

  const gravatarUrl = gravatar.url(user?.email ?? '')

  const handleLogOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <Flex justify={'flex-end'} align={'flex-start'}>
        <Typography style={{ color: 'hotpink', marginTop: '5px', marginRight: '15px' }}>{text}</Typography>

        <Avatar src={gravatarUrl} />

        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogOut} style={{ color: 'hotpink' }}>
          Logout
        </Button>
      </Flex>
    </>
  )
}
