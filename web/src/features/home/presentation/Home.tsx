import { Navbar } from '@/common/components/navbar/Navbar'
import { useBearStore } from '@/stores/bear.store'
import { Button } from 'antd'

export const Home: React.FC = () => {
  const bearStore = useBearStore()
  return (
    <>
      <Navbar />
      <div>
        {bearStore.bears}
        <br />
        <Button
          type="primary"
          onClick={() => {
            bearStore.increase(1)
          }}
        >
          Button
        </Button>
      </div>
    </>
  )
}
