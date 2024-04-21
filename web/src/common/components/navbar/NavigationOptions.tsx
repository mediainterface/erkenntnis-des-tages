import { ROUTING_PATH } from '@/features/router/domain/constants/routing-path.constants'
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const NavigationOptions: React.FC = () => {
  const [current, setCurrent] = useState('mail')
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
  }, [])


  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

