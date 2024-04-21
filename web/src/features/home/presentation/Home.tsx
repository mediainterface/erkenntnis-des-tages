import { useBearStore } from '@/stores/bear.store'
import React from 'react'
import { Alert, Button, Card, Checkbox, CheckboxProps, Flex, Slider, Space, Typography } from 'antd'

export const Home: React.FC = () => {
  const bearStore = useBearStore()
  const [showUnicorn, setShowUnicorn] = React.useState(false)

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }
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

    <Flex gap="middle" align="middle" vertical style={{ padding: '20px', overflowY: 'auto' }}>
      <Button type="primary">Button</Button>
      <Card>
        Card
        <Typography>Hier ist Home</Typography>
      </Card>
      <Checkbox onChange={onChange}>Checkbox</Checkbox>
      <Slider defaultValue={30} />
      <Slider range defaultValue={[20, 50]} />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="Success Text"
          description="Success Description Success Description Success Description"
          type="success"
        />
        <Alert
          message="Info Text"
          description="Info Description Info Description Info Description Info Description"
          type="info"
        />
        <Alert
          message="Warning Text"
          description="Warning Description Warning Description Warning Description Warning Description"
          type="warning"
        />
        <Alert
          message="Error Text"
          description="Error Description Error Description Error Description Error Description"
          type="error"
        />
      </Space>
    </Flex>
    </>
  )
}
