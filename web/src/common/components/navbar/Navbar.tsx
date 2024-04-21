import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'
import { Avatar, Flex, Typography } from 'antd'
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
  const gravatarUrl = gravatar.url('mail@jonascurth.de')
  const userName = user?.email ?? 'keine EMail'
  const greeting = 'Hello'
  const text = `${greeting} ${userName}`
  return (
    <>
      <Flex justify={'flex-end'} align={'flex-start'}>
        <Typography style={{ color: 'hotpink', marginTop: '5px', marginRight: '10px' }}>{text}</Typography>

        <Avatar src={gravatarUrl} />
      </Flex>
    </>
  )
}
