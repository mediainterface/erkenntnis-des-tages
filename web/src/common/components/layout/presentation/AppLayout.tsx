import StyledHeader from '@/common/components/header/styled/StyledHeader.tsx'
import StyledLayout from '@/common/components/layout/styled/StyledLayout.tsx'
import React from 'react'

export const AppLayout: React.FC = () => {
  return (
    <StyledLayout>
      <StyledHeader>Header</StyledHeader>
      hier kommt das Layout rein
    </StyledLayout>
  )
}
