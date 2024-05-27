import { supabase } from '@/supabase'
import { AppLayout } from '@/common/components/layout/presentation/AppLayout.tsx'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { useUserStore } from '@/stores/useUserStore.tsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../helper/profile.helper'
import { LoginForm } from "@/features/auth/presentation/LoginForm.tsx";

export const AuthProvider: React.FC = () => {
  const [shouldShowAuthScreen, setShouldShowAuthScreen] = React.useState(true)
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const clearUser = useUserStore((state) => state.clearUser)
  const updateUserProfile = useUserStore((state) => state.updateUserProfile)

  const checkProfile = React.useCallback(async () => {
    const profile = await getUserProfile()
    if (!profile) {
      navigate(ROUTING_PATH.completeProfile)
    }
  }, [navigate])

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setShouldShowAuthScreen(!session)
      if (!session) {
        clearUser()
        navigate(ROUTING_PATH.home)
      }
      if (event === 'SIGNED_IN') {
        checkProfile()
      }
      if (session?.user) {
        setUser(session.user)
        updateUserProfile()
      }
    })

    // Cleanup listener when component unmounts
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [navigate, checkProfile, setUser,clearUser])


  const handleLoginSuccess = (session) => {
    setShouldShowAuthScreen(false);
    setUser(session.user);
    checkProfile();
  };

  return shouldShowAuthScreen ? (
    <LoginForm onLoginSuccess={handleLoginSuccess} />
  ) : (
    <AppLayout />
  )
}

