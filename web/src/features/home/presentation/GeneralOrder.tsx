import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import { Flex, Tooltip, Typography } from 'antd'
import React from 'react'

type CircleProps = {
  x: number
  y: number
  radius: number
} & Partial<Profile>

const Circle: React.FC<CircleProps> = (props) => {
  const { x, y, radius, avatar_url, username, order_id } = props
  const borderStyle = order_id === 1 ? '4px solid gold' : '1px solid white'

  return (
    <Tooltip title={username}>
      <img
        src={avatar_url}
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          position: 'absolute',
          left: x - radius,
          top: y - radius,
          border: borderStyle,
        }}
      />
    </Tooltip>
  )
}

interface GeneralOrderProps {
  size: number
}

export const GeneralOrder: React.FC<GeneralOrderProps> = (props) => {
  const { size } = props
  const [profiles, setProfiles] = React.useState<Profile[]>([])
  const largeRadius = size
  const smallRadius = 50
  // const smallRadius = size / 6
  const smallCircleCount = 10
  const centerX = 320
  const centerY = centerX
  const circles = []
  const angleStep = (2 * Math.PI) / smallCircleCount

  React.useEffect(() => {
    const getProfiles = async () => {
      const { data, error: profilesError } = await supabase.from(TABLE_NAME.profiles).select()

      if (profilesError) {
        throw new Error('cannot get profiles')
      }

      const sortedProfiles = (data as Profile[])
        .filter((profiles) => profiles.order_id !== -1)
        .sort((a, b) => a.order_id - b.order_id)
      setProfiles(sortedProfiles)
    }
    getProfiles()
  }, [])

  if (profiles.length) {
    for (let i = 0; i < smallCircleCount; i++) {
      const angle = i * angleStep
      console.log(i, angle)
      const x = centerX + largeRadius * Math.cos(angle)
      const y = centerY + 5 + largeRadius * Math.sin(angle)
      // circles.push(<Circle key={i} x={x} y={y} radius={smallRadius} {...profiles[i]} />)
      //
      circles.push(
        <div
          key={i}
          style={{
            backgroundImage: 'yellow',
            width: 50,
            height: 50,
            borderRadius: '50%',
            position: 'absolute',
            border: '1px solid black',
            // top: `calc(0% - 25px)`,
            top: x - smallRadius,
            // left: `calc(0% - 25px)`,
            left: y - smallRadius,
          }}
        />,
      )
    }
  }

  return (
    <>
      <div
        style={{
          backgroundColor: 'green',
          width: largeRadius * 2,
          height: largeRadius * 2,
          borderRadius: '50%',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          // left: centerX - largeRadius,
          // top: centerY - largeRadius,
          border: '1px solid white',
        }}
      >
        <Flex vertical align={'center'} justify="center" gap="large" style={{ height: '100%' }}>
          <Typography.Text>TEST</Typography.Text>
          <div style={{ maxWidth: '250px' }}>
            <img src="https://cdn-icons-png.flaticon.com/128/3468/3468306.png" alt={'unicorn'} />
          </div>
        </Flex>

        {circles}
      </div>
    </>
  )
}
