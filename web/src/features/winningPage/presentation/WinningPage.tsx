import { useWindowSize } from '@/common/hooks/useWindowSize.tsx'
import { Card, Typography } from 'antd'
import React from 'react'
import Confetti from 'react-confetti'

export const WinningPage: React.FC = () => {
  const { width, height } = useWindowSize()
  return (
    <>
      <Confetti width={width} height={height} />
      <Card style={{ width: '100%', height: '100%' }}>
        <Typography.Title>Du hast gewonnen!!!</Typography.Title>
        <div style={{ maxWidth: '250px' }}>
          <img src="https://cdn-icons-png.flaticon.com/128/3468/3468306.png" alt={'unicorn'} />
        </div>
      </Card>
    </>
  )
}
