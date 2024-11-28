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
  const [profiles, setProfiles] = React.useState<Profile[]>([])

  const { token } = theme.useToken()

  const getLastPollCreator = async (): Promise<string> => {
    let pollcreator = ''
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME.polls)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error || !data) {
        throw new Error('cannot get latest poll')
      }
      const poll = data as Poll
      pollcreator = poll.user_id
    } catch (error) {
      alert(error)
    }

    return pollcreator
  }

  const getProfiles = React.useCallback(async () => {
    try {
      // get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('cannot get current user')
      }

      const pollCreatorId = (await getLastPollCreator()) ?? user?.id

      setProfiles(
        await generateOrder(pollCreatorId).catch((error) => {
          throw error
        }),
      )
    } catch (error) {
      alert(error)
    }

    return []
  }, [])

  React.useEffect(() => {
    getProfiles()
  }, [getProfiles])

  return (
    <Space direction="vertical" align="center" style={{ width: '100%' }}>
      <Typography.Title level={3}>Wer fängt heute an?</Typography.Title>
      {profiles.length === 0 ? (
        <Loader />
      ) : (
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
      )}
    </Space>
  )
}
