import { useGravatar } from '@/common/hooks/UseGravatar'
import { supabase } from '@/supabase.tsx'
import { User } from '@supabase/supabase-js'
import { Flex, Typography } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React from 'react'

export const AppHeader: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const [getGravatarUrl] = useGravatar()

  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data) {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  const gravatarUrl = getGravatarUrl(user?.email ?? '')

  return (
    <Flex justify={'space-between'}>
      <Typography.Title>EDT </Typography.Title>
      <Avatar size="large" src={gravatarUrl} />
    </Flex>
  )
}
