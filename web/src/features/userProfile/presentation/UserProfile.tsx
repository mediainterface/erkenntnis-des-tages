import { STORAGE_BUCKET } from '@/common/constants/storageBucket.constants'
import { useUserStore } from '@/stores/useUserStore.tsx'
import { supabase } from '@/supabase'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { Badge, Card, Descriptions, DescriptionsProps, Flex, message } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React from 'react'

export const UserProfile: React.FC = () => {
  const [isChangeing, setIsChanging] = React.useState(false)
  const userProfile = useUserStore((state) => state.userProfile)
  const updateUserProfile = useUserStore((state) => state.updateUserProfile)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const bucketFilePath = React.useMemo(() => `${userProfile?.user_id}/avatar.jpg`, [userProfile?.user_id])

  if (!userProfile) {
    return null
  }

  const bucketName = STORAGE_BUCKET.UserData

  const handleBadgeClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      setIsChanging(true)
      fileInputRef.current.click()
    }
  }

  const handleError = (text: string = 'Es ist ein Fehler aufgetreten') => {
    message.error(text)
    setIsChanging(false)
  }

  const updateAvatarUrl = async () => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(bucketFilePath)

    if (!data) {
      handleError('Das neue Profilbild konnte nicht geladen werden.')
      return
    }

    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: data.publicUrl })
      .eq('user_id', userProfile.user_id)

    if (error) {
      handleError('Das neue Profilbild konnte leider nicht gesetzt werden. Bitte versuche es nochmal.')
      return
    }

    updateUserProfile()
    message.success('Das Profilbild wurde erfolgreich geändert')
    setIsChanging(false)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      handleError('Keine Datei ausgewählt.')
      return
    }

    try {
      if (userProfile.avatar_url.includes('gravatar')) {
        // Upload new avatar because the user is currently using Gravatar
        const { error } = await supabase.storage
          .from(bucketName)
          .upload(bucketFilePath, file, { cacheControl: '3600', upsert: true })

        if (error) {
          throw error
        }
      } else {
        // User already has a custom avatar, so update it
        const { error } = await supabase.storage.from(bucketName).update(bucketFilePath, file, { cacheControl: '3600' })

        if (error) {
          throw error
        }
      }
    } catch {
      handleError('Fehler beim Hochladen der Datei.')
    }
    message.success('Profilbild wurde erfolgreich hochgeladen')
    updateAvatarUrl()
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: userProfile.username,
    },
  ]

  const iconProps: AntdIconProps = { style: { cursor: 'pointer' }, onClick: handleBadgeClick }
  const BadgeIcon = isChangeing ? LoadingOutlined : UploadOutlined

  return (
    <Flex style={{ justifyContent: 'center', alignItems: 'start', paddingTop: '5rem' }}>
      <Card style={{ width: 300 }}>
        <Flex align="center" gap={'large'}>
          <Badge count={<BadgeIcon {...iconProps} />}>
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
          accept="image/jpeg"
        />
      </Card>
    </Flex>
  )
}
