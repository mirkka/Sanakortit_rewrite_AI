import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client/react'
import App from './App'
import { store } from './store'
import { apolloClient } from './apollo/client'
import theme from './styles/theme'
import './styles/global.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <BrowserRouter basename={process.env.BASENAME}>
            <App />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </ConfigProvider>
  </React.StrictMode>
)
