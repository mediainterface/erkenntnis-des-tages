import StyledHeader from '@/common/components/header/styled/StyledHeader.tsx'
import StyledLayout from '@/common/components/layout/styled/StyledLayout.tsx'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const AppLayout: React.FC = () => {
  return (
    <StyledLayout>
      <StyledHeader>
        Header
        <Avatar size={32} icon={<UserOutlined />} />
      </StyledHeader>
      <Outlet />
    </StyledLayout>
  )
}
