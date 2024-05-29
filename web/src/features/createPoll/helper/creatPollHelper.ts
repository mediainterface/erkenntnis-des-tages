import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'

export const generateOrder = async (startingUserId: User['id']): Promise<Profile[]> => {
  const { data, error: profilesError } = await supabase.from(TABLE_NAME.profiles).select()

  if (profilesError) {
    throw new Error('cannot get profiles')
  }

  const profiles = (data as Profile[])
    .filter((profiles) => profiles.order_id !== -1)
    .sort((a, b) => a.order_id - b.order_id)

  const startPoint = profiles.find((profile) => profile.user_id === startingUserId)?.order_id ?? 0

  const lastPoint = profiles.reduce((a, b) => {
    const highestValue = Math.max(a.order_id, b.order_id)
    return a.order_id === highestValue ? a : b
  }).order_id

  const order: Profile[] = []
  for (let i = startPoint - 1; i <= lastPoint - 1; i++) {
    // if profile is undefined skip this one
    if (!profiles[i]) {
      continue
    }
    order.push(profiles[i])
  }

  for (let i = 0; i < startPoint - 1; i++) {
    // if profile is undefined skip this one
    if (!profiles[i]) {
      continue
    }
    order.push(profiles[i])
  }

  return order
}
