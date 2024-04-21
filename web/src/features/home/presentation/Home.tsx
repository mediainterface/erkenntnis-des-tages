import { useBearStore } from '@/stores/bear.store'
import { Button } from 'antd'
import React from 'react'

export const Home: React.FC = () => {
  const bearStore = useBearStore()
  const [showUnicorn, setShowUnicorn] = React.useState(false)

  return (
    <>
      <div>
        {bearStore.bears}
        <br />
        <Button
          type="primary"
          onClick={() => {
            bearStore.increase(1)
            setShowUnicorn(!showUnicorn)
          }}
        >
          Button
        </Button>
      </div>
      {showUnicorn && <img src="https://cdn-icons-png.flaticon.com/128/3468/3468306.png" />}
    </>
  )
}

