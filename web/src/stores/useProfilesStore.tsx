import { supabase } from '@/supabase.tsx'
import { create } from 'zustand'

export type Profile = {
  user_id: string
  username: string
  avatar_url: string
  order_id: number
}

type ProfileState = {
  profiles: { [key: string]: Profile | null }
  getProfile: (user_id: string) => Promise<Profile | null>
}

export const useProfilesStore = create<ProfileState>((set) => ({
  profiles: {},
  getProfile: async (user_id: string) => {
    const { data } = await supabase
      .from('profiles') // Adjust table name if needed
      .select()
      .eq('user_id', user_id)
      .single()

    if (data) {
      const profile = data as Profile
      set((state) => ({
        profiles: {
          ...state.profiles,
          [user_id]: profile,
        },
      }))
      return profile
    }
  },
}))
