import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { RoutingPath } from '@/features/router/domain/types/routing-path.type'
import { HomeOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

import { PERSON_X_EMAIL } from '@/common/constants/person-x-email.constants'
import { useUserStore } from '@/stores/user.store'
import { supabase } from '@/supabase.tsx'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const NavigationOptions: React.FC = () => {
  const location = useLocation()
  const [current, setCurrent] = useState<RoutingPath>(location.pathname as RoutingPath)
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)

  const handleLogOut = async () => {
    await supabase.auth.signOut()
  }

  const items: MenuProps['items'] = React.useMemo(() => {
    return [
      {
        label: 'Home',
        key: ROUTING_PATH.home,
        icon: <HomeOutlined />,
        onClick: () => {
          navigate(ROUTING_PATH.home)
        },
      },
      {
        label: 'Umfragen',
        key: ROUTING_PATH.pollsOverview,
        icon: <PieChartOutlined />,
        onClick: () => {
          navigate(ROUTING_PATH.pollsOverview)
        },
      },
      {
        label: user?.email === PERSON_X_EMAIL ? 'Au revoir' : 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
        onClick: () => handleLogOut(),
      },
    ]
  }, [navigate, user?.email])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key as RoutingPath)
  }

  return (
    <Menu
      style={{ justifyContent: 'center' }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}

