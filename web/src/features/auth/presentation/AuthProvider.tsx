import { supabase } from '@/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Button } from 'antd'


import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthProvider: React.FC = () => {
  const [shouldShowAuthScreen, setShouldShowAuthScreen] = React.useState(false)
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setShouldShowAuthScreen(true)
      }
    })

    // Cleanup listener when component unmounts
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return shouldShowAuthScreen ? (
    <Auth supabaseClient={supabase} providers={[]} redirectTo="" appearance={{ theme: ThemeSupa }} />
  ) : (
    <>
      <Button onClick={handleSignOut}>Logout</Button>
      <Outlet />
    </>
  )
}

