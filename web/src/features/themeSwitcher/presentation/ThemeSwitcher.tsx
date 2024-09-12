import React from 'react'

export const ThemeSwitcher: React.FC = () => {
  // Inner threshold wrapper to snap the button to a new position
  const ref = React.useRef<HTMLDivElement>(null)

  // Outer wrapper to move the button away from the cursor
  const outerRef = React.useRef<HTMLDivElement>(null)

  // Snap offset for the button
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)

  // Slow move offset for the button
  const [outerX, setOuterX] = React.useState(0)
  const [outerY, setOuterY] = React.useState(0)

  // For disabling the button when it's moving
  const [disabled, setDisabled] = React.useState(false)

  const randomBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  // Will slowly move the button away from the cursor when close
  const onOuterMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!outerRef.current) {
      return
    }

    const outerRect = outerRef.current.getBoundingClientRect()
    const innerRect = ref.current?.getBoundingClientRect()
    const wrapperRect = ref.current?.parentElement?.parentElement?.getBoundingClientRect()

    // if innerRect is outside of wrapper, call onMouseEnter
    if (!innerRect || !wrapperRect) {
      return
    }
    if (
      innerRect?.left < wrapperRect?.left ||
      innerRect?.right > wrapperRect?.right ||
      innerRect?.top < wrapperRect?.top ||
      innerRect?.bottom > wrapperRect?.bottom
    ) {
      onMouseEnter(e)
      return
    }

    // Calculate the center of the element
    const centerX = outerRect.left + outerRect.width / 2
    const centerY = outerRect.top + outerRect.height / 2

    // Calculate the distance from the cursor to the center of the element
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Define a fraction of the distance to offset with
    const moveY = -distanceY / 140
    const moveX = -distanceX / 140

    // Update the element's position
    setOuterX((prevX) => prevX + moveX)
    setOuterY((prevY) => prevY + moveY)
  }

  // Will reposition the mouse enters some threshold
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      return
    }

    setDisabled(true)

    setTimeout(() => {
      setDisabled(false)
    }, 80)

    if (!ref.current) {
      return
    }

    const buttonRect = ref.current.getBoundingClientRect()
    const wrapperRect = ref.current.parentElement?.parentElement?.getBoundingClientRect()

    if (!wrapperRect || !buttonRect) {
      return
    }

    const cursorX = e.clientX - wrapperRect.left
    const cursorY = e.clientY - wrapperRect.top

    // Generate 10 random positions inside the wrapper
    // and keep track of the farthest one
    let maxDistance = 0
    let farthestPosition = { x: 0, y: 0 }
    const visableXPositions = { min: 450, max: 1300 }
    for (let i = 0; i < 10; i++) {
      const randomX = randomBetween(visableXPositions.min, visableXPositions.max)
      const randomY = randomBetween(buttonRect.height / 2, wrapperRect.height - buttonRect.height / 2)

      const distance = Math.sqrt(Math.pow(randomX - cursorX, 2) + Math.pow(randomY - cursorY, 2))
      if (distance > maxDistance) {
        maxDistance = distance
        farthestPosition = { x: randomX, y: randomY }
        console.log(farthestPosition)
      }
    }

    // Set the button's translation to the farthest position
    setX(farthestPosition.x - wrapperRect.width / 2)
    setY(farthestPosition.y - wrapperRect.height / 2)

    // Reset the slow move offset covered next
    setOuterX(0)
    setOuterY(0)
  }

  return (
    <div
      style={{
        display: 'inline-block',
        padding: '16px',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.05 : 1,
        transform: `translate3d(${outerX + x}px, ${outerY + y}px, 0px)`,
        transition: 'transform 120ms ease',
      }}
      onMouseMove={onOuterMove}
      ref={outerRef}
    >
      {/*TODO: display tooltip with "sry Henri :)"*/}
      <div
        ref={ref}
        style={{
          display: 'inline-block',
          padding: '30px',
        }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseEnter}
      >
        <button>Click Me</button>
      </div>
    </div>
  )
}
