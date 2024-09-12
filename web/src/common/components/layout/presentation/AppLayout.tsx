import StyledContent from '@/common/components/content/styled/StyledContent.tsx'
import StyledFooter from '@/common/components/footer/styled/StyledFooter.tsx'
import StyledLayout from '@/common/components/layout/styled/StyledLayout.tsx'
import { NavigationOptions } from '@/common/components/navbar/NavigationOptions.tsx'

import { AppHeader } from '@/common/components/header/presentation/AppHeader.tsx'
import StyledHeader from '@/common/components/header/styled/StyledHeader.tsx'
import { ThemeSwitcher } from '@/features/themeSwitcher/presentation/ThemeSwitcher'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const AppLayout: React.FC = () => {
  return (
    <StyledLayout>
      <StyledHeader>
        <AppHeader />
      </StyledHeader>
      <StyledContent>
        <Outlet />
        <ThemeSwitcher />
      </StyledContent>
      <StyledFooter>
        <NavigationOptions />
      </StyledFooter>
    </StyledLayout>
  )
}
