import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import { Button, Spin } from 'antd'
import React from 'react'


import { NewPollOption } from '@/common/types/tables/poll_options/new-poll-option.type'
import { NewPoll } from '@/common/types/tables/polls/new-poll.type'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { User } from '@supabase/supabase-js'
import { EdtInput, EdtInputHandle } from './EdtInput'

const generateOrder = (profiles: Profile[], startPoint: number, lastPoint: number): Profile[] => {
  const order: Profile[] = []
  for (let i = startPoint - 1; i <= lastPoint - 1; i++) {
    order.push(profiles[i])
  }

  for (let i = 0; i < startPoint - 1; i++) {
    order.push(profiles[i])
  }

  return order
}

export const CreatePoll: React.FC = () => {
  const [profiles, setProfiles] = React.useState<Profile[]>([])
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [hasCreatedAPoll, setHasCreatedAPoll] = React.useState(false)

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
      setCurrentUser(user)

      const { data, error: profilesError } = await supabase.from(TABLE_NAME.profiles).select()

      if (profilesError) {
        throw new Error('cannot get profiles')
      }

      const profilesResponse = data as Profile[]

      const startOrderPoint =
        profilesResponse.filter((profiles) => profiles.order_id !== -1).find((profile) => profile.user_id === user.id)
          ?.order_id ?? 0

      const lastOrderPoint = profilesResponse.reduce((a, b) => {
        const highestValue = Math.max(a.order_id, b.order_id)
        return a.order_id === highestValue ? a : b
      }).order_id

      setProfiles(generateOrder(profilesResponse, startOrderPoint, lastOrderPoint))
    } catch (error) {
      alert(error)
    }

    return []
  }, [])

  React.useEffect(() => {
    getProfiles()
  }, [])

  const childRefs = React.useRef<EdtInputHandle[]>([])

  const handleCreateNewPoll = async () => {
    const newPoll: NewPoll = {
      created_at: new Date().toISOString(),
      is_closed: false,
      user_id: currentUser?.id ?? '',
    }
    const { data, error } = await supabase.from(TABLE_NAME.polls).insert(newPoll).select()
    if (!data || error) {
      console.error(error)
      alert(error?.message)
      return
    }
    const createPollResponse = data as Poll[]

    const allEdts = childRefs.current.map((ref) => ref.getEdtInput()).filter((input) => input.edt !== '')

    const pollOptions: NewPollOption[] = profiles.map((profile) => {
      const edt = allEdts.find((input) => input.user_id === profile.user_id)?.edt ?? ''
      return {
        content: edt,
        created_at: createPollResponse[0].created_at,
        poll_id: createPollResponse[0].id,
        user_id: profile.user_id,
      }
    })

    const { data: pollOptionsResponse, error: pollOptionsError } = await supabase
      .from(TABLE_NAME.poll_options)
      .insert(pollOptions)
      .select()

    if (!pollOptionsResponse || pollOptionsError) {
      console.error(pollOptionsError)
      alert(pollOptionsError?.message)
      return
    }
    setHasCreatedAPoll(true)
  }

  return profiles.length === 0 ? (
    <Spin size="large" />
  ) : (
    <>
      {profiles.map((profile, index) => (
        <EdtInput
          key={profile.user_id}
          profile={profile}
          style={{ marginTop: '20px' }}
          ref={(el) => (childRefs.current[index] = el!)}
        />
      ))}
      <Button onClick={handleCreateNewPoll} disabled={hasCreatedAPoll}>
        Umfrage starten
      </Button>
    </>
  )
}

