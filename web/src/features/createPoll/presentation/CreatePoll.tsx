import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profile.type'
import { supabase } from '@/supabase'
import React from 'react'
import { EdtInput } from './EdtInput'

const generateOrder = (profiles: Profile[], startPoint: number, lastPoint: number): Profile[] => {
  const order: Profile[] = []
  for (let i = startPoint; i === lastPoint; i++) {
    order.push(profiles[i])
  }

  for (let i = 0; i < startPoint; i++) {
    order.push(profiles[i])
  }

  return order
}

export const CreatePoll: React.FC = () => {
  const [profiles, SetProfiles] = React.useState<Profile[]>([])

  const getProfiles = React.useCallback(async (): Promise<Profile[]> => {
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
      if (profilesError) {
        throw new Error('cannot get profiles')
      }
      const profiles = data as Profile[]
      const startOrderPoint =
        profiles.filter((profiles) => profiles.order !== -1).find((profile) => profile.user_id === user.id)?.order ?? 0

      const lastOrderPoint = profiles.reduce((a, b) => {
        const highestValue = Math.max(a.order, b.order)
        return a.order === highestValue ? a : b
      }).order

      return generateOrder(profiles, startOrderPoint, lastOrderPoint)
    } catch (error) {
      alert(error)
    }

    return []
  }, [])

  React.useEffect(() => {
    const performAction = async () => {
      SetProfiles(await getProfiles())
    }
    performAction()
  }, [getProfiles])


  return profiles.map((profile) => <EdtInput profile={profile} />)
}

