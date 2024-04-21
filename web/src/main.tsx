import { ConfigProvider, theme } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: '#574088', colorInfo: '#722ed1', colorBgBase: '#232033' },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
