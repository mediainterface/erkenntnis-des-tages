import { Button } from 'antd'
import { useBearStore } from './stores/bear.store'

const App = () => {
  const bearStore = useBearStore()

  return (
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
  )
}

export default App

