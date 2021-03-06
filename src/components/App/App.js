import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import CoinsList from 'components/CoinsList'
import CoinPage from 'components/CoinPage'

const App = () => (
  <Switch>
    <Route path="/" exact component={CoinsList} />
    <Route path="/coins/:id" component={CoinPage} />
    <Redirect from="coins/" to="/" />
    <Redirect from="*" to="/" />
  </Switch>
)

export default App
