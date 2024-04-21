import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { RoutingPath } from '@/features/router/domain/types/routing-path.type'
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const NavigationOptions: React.FC = () => {
  const [current, setCurrent] = useState<RoutingPath>(ROUTING_PATH.home)
  const navigate = useNavigate()


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
        label: 'Umfrage erstellen',
        key: ROUTING_PATH.createPoll,
        icon: <PieChartOutlined />,
        onClick: () => {
          navigate(ROUTING_PATH.createPoll)
        },
      },
    ]
  }, [navigate])


  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key as RoutingPath)
  }

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

