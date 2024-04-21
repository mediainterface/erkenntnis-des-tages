import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import React from 'react'
import { EdtInput } from './EdtInput'

const generateOrder = (profiles: Profile[], startPoint: number, lastPoint: number): Profile[] => {
  const order: Profile[] = []
  for (let i = startPoint; i < lastPoint; i++) {
    order.push(profiles[i])
  }

  for (let i = 0; i < startPoint; i++) {
    order.push(profiles[i])
  }

  return order
}

export const CreatePoll: React.FC = () => {
  const [profiles, setProfiles] = React.useState<Profile[]>([])

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

      const { data, error: profilesError } = await supabase.from(TABLE_NAME.profiles).select()
      console.log('data', data)

      if (profilesError) {
        throw new Error('cannot get profiles')
      }

      const profilesResponse = data as Profile[]

      console.log('profiles', profilesResponse)
      console.log(profilesResponse.find((profile) => profile.user_id === user.id))

      const startOrderPoint =
        profilesResponse.filter((profiles) => profiles.order_id !== -1).find((profile) => profile.user_id === user.id)
          ?.order_id ?? 0

      const lastOrderPoint = profilesResponse.reduce((a, b) => {
        const highestValue = Math.max(a.order_id, b.order_id)
        return a.order_id === highestValue ? a : b
      }).order_id

      console.log(startOrderPoint)

      console.log(lastOrderPoint)

      console.log('order', generateOrder(profilesResponse, startOrderPoint, lastOrderPoint))

      setProfiles(generateOrder(profilesResponse, startOrderPoint, lastOrderPoint))
    } catch (error) {
      alert(error)
    }

    return []
  }, [])

  React.useEffect(() => {
    getProfiles()
  }, [])

  return profiles.map((profile) => <EdtInput profile={profile} />)
}

