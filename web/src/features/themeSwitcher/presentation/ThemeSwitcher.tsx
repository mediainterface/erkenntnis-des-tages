import { MoonFilled, MoonOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import React from 'react'

export const ThemeSwitcher: React.FC = () => {
  const isDarkMode = true
  const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const floatButtonStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    transform: 'translate(-50%, -50%)',
    transition: 'top 0.1s, left 0.1s',
  }

  return <FloatButton style={floatButtonStyle} icon={isDarkMode ? <MoonOutlined /> : <MoonFilled />} />
}
