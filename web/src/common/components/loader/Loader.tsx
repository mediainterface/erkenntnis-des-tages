import { Space, Spin } from 'antd'

export const Loader: React.FC = () => (
  <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
    <Spin size="large" />
  </Space>
)
