import { useWindowSize } from '@/common/hooks/useWindowSize'
import { Button } from 'antd'
import React from 'react'

export const ThemeSwitcher: React.FC = () => {
  const { height, width } = useWindowSize()
  const pagePadding = 50

  const [buttonPosition, setButtonPosition] = React.useState({ x: width + pagePadding, y: height + pagePadding })
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = React.useState({ vx: 0, vy: 0 })
  const [isMouseInside, setIsMouseInside] = React.useState(false)

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  // Ref to store the previous mouse position and timestamp
  const prevPosRef = React.useRef({ x: 0, y: 0, timestamp: Date.now() })

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event
    const currentTime = Date.now()
    const timeDiff = currentTime - prevPosRef.current.timestamp

    if (timeDiff > 0) {
      const deltaX = clientX - prevPosRef.current.x
      const deltaY = clientY - prevPosRef.current.y

      // Calculate velocity
      const vx = deltaX / timeDiff
      const vy = deltaY / timeDiff

      setVelocity({ vx, vy })
      setMousePos({ x: clientX, y: clientY })

      // Update the previous position and timestamp
      prevPosRef.current = { x: clientX, y: clientY, timestamp: currentTime }
    }
  }

  const updateButtonPosition = () => {
    setButtonPosition((prev) => {
      return { x: prev.x + 10, y: prev.y + 10 }
    })
  }

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      onMouseLeave={() => {
        setIsMouseInside(false)
      }}
      onMouseEnter={() => {
        setIsMouseInside(true)
      }}
      onMouseMove={() => {
        isMouseInside && updateButtonPosition()
      }}
      style={{
        position: 'absolute',
        right: buttonPosition.x,
        bottom: buttonPosition.y,
        backgroundColor: isMouseInside ? 'hotpink' : 'lightblue',
        padding: '100px',
      }}
    >
      <p>
        Mouse Position: ({mousePos.x}, {mousePos.y})
      </p>
      <p>
        Mouse Velocity: (vx: {velocity.vx.toFixed(2)}, vy: {velocity.vy.toFixed(2)}) px/ms
      </p>
      <Button
        ref={buttonRef}
        style={{
          transition: 'left 0.3s, top 0.3s', // for smooth transition
        }}
      >
        Move Me
      </Button>
    </div>
  )
}
