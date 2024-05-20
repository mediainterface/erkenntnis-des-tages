import { useWindowSize } from '@/common/hooks/useWindowSize'
import { Button } from 'antd'
import React from 'react'

const getRandomDirection = () => {
  const directions = [
    { x: 10, y: 0 }, // right
    { x: -10, y: 0 }, // left
    { x: 0, y: 10 }, // down
    { x: 0, y: -10 }, // up
  ]
  const randomIndex = Math.floor(Math.random() * directions.length)
  return directions[randomIndex]
}

export const ThemeSwitcher: React.FC = () => {
  const { height, width } = useWindowSize()
  const pagePadding = 50
  const [position, setPosition] = React.useState({ x: width + pagePadding, y: height + pagePadding })
  const [isMouseInside, setIsMouseInside] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const moveButton = () => {
    const direction = getRandomDirection()
    setPosition((prevPosition) => ({
      x: prevPosition.x + direction.x,
      y: prevPosition.y + direction.y,
    }))
  }

  return (
    <div
      onMouseLeave={() => {
        setIsMouseInside(false)
      }}
      onMouseEnter={() => {
        setIsMouseInside(true)
      }}
      style={{
        position: 'absolute',
        right: position.x,
        bottom: position.y,
        backgroundColor: isMouseInside ? 'hotpink' : 'lightblue',
        padding: '40px',
      }}
    >
      <Button
        ref={buttonRef}
        style={{
          transition: 'left 0.3s, top 0.3s', // for smooth transition
        }}
        onClick={moveButton}
      >
        Move Me
      </Button>
    </div>
  )
}
