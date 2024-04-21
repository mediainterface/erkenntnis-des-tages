import { supabase } from '@/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { AppLayout } from '@/common/components/layout/presentation/AppLayout.tsx'

import { Navbar } from '@/common/components/navbar/Navbar'
import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUserProfile } from '../helper/profile.helper'

export const AuthProvider: React.FC = () => {
  const [shouldShowAuthScreen, setShouldShowAuthScreen] = React.useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setShouldShowAuthScreen(!session)
    })

    const checkProfile = async () => {
      const profile = await getUserProfile()
      if (!profile) {
        navigate(ROUTING_PATH.completeProfile)
      }
    }

    checkProfile()
    // Cleanup listener when component unmounts
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [navigate])

  return shouldShowAuthScreen ? (
    <Auth supabaseClient={supabase} providers={[]} redirectTo="" appearance={{ theme: ThemeSupa }} />
  ) : (
    <>
    <AppLayout />
      <Navbar />
      <Outlet />
    </>
  )
}
