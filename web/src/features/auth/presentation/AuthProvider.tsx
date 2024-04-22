import { supabase } from '@/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { AppLayout } from '@/common/components/layout/presentation/AppLayout.tsx'

import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../helper/profile.helper'

export const AuthProvider: React.FC = () => {
  const [shouldShowAuthScreen, setShouldShowAuthScreen] = React.useState(true)
  const navigate = useNavigate()

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
        navigate(ROUTING_PATH.home)
      }
      if (event === 'SIGNED_IN') {
        checkProfile()
      }
    })

    checkProfile()
    // Cleanup listener when component unmounts
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [navigate, checkProfile])

  return shouldShowAuthScreen ? (
    <Auth supabaseClient={supabase} providers={[]} redirectTo="" appearance={{ theme: ThemeSupa }} />
  ) : (
    <AppLayout />
  )
}

