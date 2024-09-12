import { Profile } from '@/common/types/tables/profiles/profile.type'
import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { useProfilesStore } from './useProfileStore'

type UserState = {
  user: User | null
  userProfile: Profile | null
}

type UserActions = {
  setUser: (user: User | null) => void
  clearUser: () => void
  updateUserProfile: () => void
}

type UserStore = UserState & UserActions

const initialState: UserState = {
  user: null,
  userProfile: null,
}

export const useUserStore = create<UserStore>()((set, get) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set({ user: null }),
  updateUserProfile: async () => {
    const userId = get().user?.id
    if (!userId) return
    const userProfile = await useProfilesStore.getState().getProfile(userId)
    set({ userProfile: userProfile })
  },
}))
