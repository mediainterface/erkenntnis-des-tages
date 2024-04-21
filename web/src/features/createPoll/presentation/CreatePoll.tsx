import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import { Button, Spin } from 'antd'
import React from 'react'


import { EdtInput, EdtInputHandle } from './EdtInput'

const generateOrder = (profiles: Profile[], startPoint: number, lastPoint: number): Profile[] => {
  const order: Profile[] = []
  console.log(profiles)
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

  const handleClick = () => {
    const allChildData = childRefs.current.map((ref) => ref.getEdtInput())
    console.log('Data from all children:', allChildData)
  }

  return profiles.length === 0 ? (
    <Spin size="large" />
  ) : (
    <>
      {profiles.map((profile, index) => (
        <EdtInput profile={profile} style={{ marginTop: '20px' }} ref={(el) => (childRefs.current[index] = el!)} />
      ))}
      <Button onClick={handleClick}>get data</Button>
    </>
  )
}

