import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App/'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import configureStore from 'store/index.js'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
