import { Loader } from '@/common/components/loader/Loader'
import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { generateOrder } from '@/features/createPoll/helper/creatPollHelper'
import { supabase } from '@/supabase'
import { ArrowDownOutlined } from '@ant-design/icons'
import { Avatar, Flex, Typography, theme } from 'antd'
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
    <Flex vertical align="center">
      <Typography.Title level={3}>Wer fängt heute an?</Typography.Title>
      {profiles.length === 0 ? (
        <Loader />
      ) : (
        profiles.map((profile, index) => (
          <Flex vertical align="center" gap={'small'}>
            <Flex align="center" justify="left" gap="small">
              <Avatar src={profile.avatar_url} />
              <Typography.Text>{profile.username}</Typography.Text>
            </Flex>
            {index < profiles.length - 1 && <ArrowDownOutlined style={{ color: token.colorTextDisabled }} />}
          </Flex>
        ))
      )}
    </Flex>
  )
}
