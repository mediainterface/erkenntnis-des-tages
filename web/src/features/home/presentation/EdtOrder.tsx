import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { generateOrder } from '@/features/createPoll/helper/creatPollHelper'
import { supabase } from '@/supabase'
import React from 'react'

export const EdtOrder: React.FC = () => {
  const [profiles, setProfiles] = React.useState<Profile[]>([])

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

  //TODO: sort based on the last poll
  return profiles.map((p) => <p>{p.username}</p>)
}
