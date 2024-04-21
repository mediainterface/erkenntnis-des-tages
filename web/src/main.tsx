import { ConfigProvider, theme } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        cssVar: true,
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: 'hsl(265, 80%, 58%)',
          colorBgBase: '#110f17',

          fontSizeHeading1: 28,
          fontSizeHeading2: 20,
          fontSizeHeading3: 18,
          fontSizeHeading4: 16,
          fontSizeHeading5: 14,
          fontWeightStrong: 300,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
