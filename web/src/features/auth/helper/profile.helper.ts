import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'

export const getUserProfile = async (): Promise<Profile | undefined> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return
  }

  const { data } = await supabase.from(TABLE_NAME.profiles).select()
  if (!data) {
    return
  }
  const profileData = data as Profile[]

  return profileData.find((profile) => profile.user_id === user?.id)
}
