import { customTheme } from '@/theme.tsx'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={customTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
