import { Alert, Button, Card, Checkbox, CheckboxProps, Flex, Slider, Space, Typography } from 'antd'
import React from 'react'

export const Home: React.FC = () => {
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }
  return (
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
  )
}
