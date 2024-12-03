import { Loader } from '@/common/components/loader/Loader'
import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { generateOrder } from '@/features/createPoll/helper/creatPollHelper'
import { supabase } from '@/supabase'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Space, Typography, theme } from 'antd'
import React from 'react'

export const EdtOrder: React.FC = () => {
  const [startingProfile, setStartingProfile] = React.useState<Profile>()
  const [profiles, setProfiles] = React.useState<Profile[]>([])

  const { token } = theme.useToken()

  const getLastPollCreator = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME.polls)
        .select()
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error || !data) {
        throw new Error('cannot get latest poll')
      }

      const poll = data as Poll
      const { data: user, error: userError } = await supabase
        .from(TABLE_NAME.profiles)
        .select()
        .eq('user_id', poll.user_id)
        .limit(1)
        .single()

      if (userError || !user) {
        throw new Error('cannot get last poll creator')
      }

      setStartingProfile(user)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const getProfiles = React.useCallback(async () => {
    try {
      const { data: user, error: userError } = await supabase
        .from(TABLE_NAME.profiles)
        .select()
        .eq('order_id', '1')
        .limit(1)
        .single()

      if (userError || !user) {
        throw new Error('cannot get current user')
      }

      const pollCreatorId = user?.id

      setProfiles(
        await generateOrder(pollCreatorId).catch((error) => {
          throw error
        }),
      )
    } catch (error) {
      console.error(error)
    }

    return []
  }, [])

  React.useEffect(() => {
    getProfiles()
    getLastPollCreator()
  }, [getProfiles, getLastPollCreator])

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      {profiles.length === 0 || !startingProfile ? (
        <Loader />
      ) : (
        <>
          <Typography.Title level={3}>Wer führt heute?</Typography.Title>
          <Space direction="vertical" align="center" size="small">
            <Avatar src={startingProfile.avatar_url} />
            <Typography.Text>{startingProfile.username}</Typography.Text>
          </Space>
          <Typography.Title level={3}>Allgemeine Reihenfolge:</Typography.Title>
          <Space direction="horizontal" align="center" size="middle">
            {profiles.map((profile, index) => (
              <React.Fragment key={profile.user_id}>
                <Space direction="vertical" align="center" size="small">
                  <Avatar src={profile.avatar_url} />
                  <Typography.Text>{profile.username}</Typography.Text>
                </Space>
                {index < profiles.length - 1 && (
                  <ArrowRightOutlined
                    style={{
                      color: token.colorTextDisabled,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Space>
        </>
      )}
    </Space>
  )
}
