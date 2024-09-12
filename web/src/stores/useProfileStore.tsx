import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase.tsx'
import { create } from 'zustand'

type ProfileState = {
  profiles: Record<string, Profile | null>
  getProfile: (user_id: string) => Promise<Profile | undefined>
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
