import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { useGravatar } from '@/common/hooks/useGravatar.tsx'
import { CreateProfile } from '@/common/types/tables/profiles/create-profile.type'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { supabase } from '@/supabase'
import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Input from 'antd/es/input/Input'
import Title from 'antd/es/typography/Title'
import Typography from 'antd/es/typography/Typography'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from "@/stores/useUserStore.tsx";

export const CompleteProfile: React.FC = () => {
  const user = useUserStore((state) => state.user)
  const [username, setUsername] = React.useState('')
  const navigate = useNavigate()
  const [getGravatarUrl] = useGravatar()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleSaveUsername = async () => {
    const newProfile: CreateProfile = {
      avatar_url: getGravatarUrl(user?.email ?? ''),
      user_id: user?.id ?? '',
      username,
    }

    const response = await supabase.from(TABLE_NAME.profiles).insert(newProfile)
    if (response.error) {
      alert(response.error.message)
      return
    }
    navigate(ROUTING_PATH.home)
  }

  return (
    <>
      <Typography>
        <Title>Vervollständige dein Profil</Title>
      </Typography>
      <Input
        placeholder="Gib deinen Benutzernamen an"
        prefix={<UserOutlined />}
        value={username}
        onChange={handleUsernameChange}
      />
      <Button
        type="primary"
        style={{ marginTop: '10px' }}
        disabled={username.length === 0}
        onClick={handleSaveUsername}
      >
        Benutzername speichern
      </Button>
    </>
  )
}

