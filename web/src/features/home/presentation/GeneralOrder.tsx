import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Profile } from '@/common/types/tables/profiles/profile.type'
import { supabase } from '@/supabase'
import { Tooltip } from 'antd'
import React from 'react'

type CircleProps = {
  x: number
  y: number
  radius: number
} & Partial<Profile>

const Circle: React.FC<CircleProps> = (props) => {
  const { x, y, radius, avatar_url, username } = props
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
          border: '1px solid white',
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
  const smallRadius = size / 6
  const smallCircleCount = 10
  const centerX = 110
  const centerY = 110
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
      const angle = i * angleStep - 1.6
      const x = centerX + largeRadius * Math.cos(angle)
      const y = centerY + largeRadius * Math.sin(angle)
      // TODO: mark first circle
      circles.push(<Circle key={i} x={x} y={y} radius={smallRadius} {...profiles[i]} />)
    }
  }

  return (
    <div
      style={{
        width: 2 * (largeRadius + smallRadius),
        height: 2 * (largeRadius + smallRadius),
        position: 'absolute',
        zIndex: 0,
        top: '38%',
        left: '43%',
      }}
    >
      <Circle x={centerX} y={centerY} radius={largeRadius} />
      {circles}
    </div>
  )
}
