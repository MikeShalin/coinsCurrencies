import React, { Component } from 'react'
import { connect } from 'react-redux'

import get from 'lodash/get'

import { coinParamsActions, coinParamsSelector } from 'ducks/coinParams'
import Graph from 'components/Graph/'
import CoinsList from 'components/CoinsList'

import {
  Wrapper,
  Title,
  TitleParams,
  SubTitle,
  Symbol,
  PriceBTC,
  USDContainer,
  PriceUSD,
  ListParams,
  Home,
} from './styled'

export class CoinPage extends Component {
  componentDidMount() {
    const {
      requestCoinParams,
      match,
      location,
    } = this.props
    const params = { coin: match.params.id, convert: 'USD' }
    const { name, symbol, price_usd } = location.state
    requestCoinParams(params)
    document.title = `${name} (${symbol}) - $ ${price_usd}`
  }
  
  getPrice = (el, i) => (i !== 0 && i % 3 === 0 ? `${el}, ` : el)
  
  commas = num => (
    Math.floor(num)
      .toString()
      .split('')
      .reverse()
      .map(this.getPrice)
      .reverse()
      .join('')
  )
  
  render() {
    const { params, location } = this.props
    const {
      name,
      symbol,
      price_usd,
      price_btc,
      percent_change_24h,
      market_cap_usd,
      available_supply,
    } = location.state
    const newState = Object.assign({}, ...location.state, {
      'Market Cap': market_cap_usd,
      'Volume (24h)': get(location,  'state.24h_volume_usd', ''),
      'Circulating Supply': available_supply,
    })
    
    return (
      <div>
        <Wrapper>
          <Title>
            {name} <Symbol>({symbol})</Symbol>
          </Title>
          <SubTitle>
            <USDContainer>
              {' '}
              <PriceUSD>$ {price_usd} </PriceUSD> USD{' '}
              <span>({percent_change_24h}%)</span>{' '}
            </USDContainer>
            <PriceBTC>
              {' '}
              <span>{price_btc}</span> BTC{' '}
            </PriceBTC>
          </SubTitle>
          <ListParams>
            {Object.entries(newState).map(([title, price], i) => (
              <div key={i}>
                <TitleParams>{title}</TitleParams>
                <div>
                  $ {this.commas(price)} {i !== 2 ? 'USD' : symbol}
                </div>
              </div>
            ))}
          </ListParams>
          <Home to="/" component={CoinsList}>
            Home
          </Home>
        </Wrapper>
        <Graph data={params} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  params: coinParamsSelector(state),
})

const mapDispatchToProps = dispatch => {
  const actionsParam = coinParamsActions.coinParams
  return {
    requestCoinParams: params => {
      dispatch(actionsParam.requestCoinParams(params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinPage)
