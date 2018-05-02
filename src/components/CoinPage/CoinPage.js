import React, { Component } from 'react'
import { connect } from 'react-redux'
import { coinParamsActions, coinParamsSelector } from 'ducks/coinParams'
import { Link } from 'react-router-dom'
import Graph from 'components/Graph/'
import CoinsList from 'components/CoinsList'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex
  flex-direction: row
  margin: 20px
`

const Title = styled.div`
  font-size: 24px
  margin-right: 40px
  font-weight: 700
`

const TitleParams = styled.div`
  font-weight: 700
`

const SubTitle = styled.div`
  font-size: 16px
  margin-right: 40px
`

const Symbol = styled.span`
  color: #999
`

const PriceBTC = styled.span`
  color: #999
`

const USDContainer = styled.div`
  display: flex
  align-items: flex-end
`

const PriceUSD = styled.div`
  font-size: 20px
  font-weight: 700
  margin-right: 3px
`

const ListParams = styled.div`
  display: flex
  width: 60%
  justify-content: space-around
`
const Home = styled(Link)`
  color: #000
  text-decoration: none
  &:hover {
    text-decoration: underline
  }
`

export class CoinPage extends Component {
  componentDidMount() {
    const { requestCoinParams, match, location } = this.props,
      params = { coin: match.params.id, convert: 'USD' },
      { name, symbol, price_usd } = location.state
    requestCoinParams(params)
    document.title = `${name} (${symbol}) - $ ${price_usd}`
  }
  commas = num => {
    const res = Math.floor(num)
      .toString()
      .split('')
      .reverse()
      .map((el, i) => (i !== 0 && i % 3 === 0 ? `${el}, ` : el))
    return res.reverse().join('')
  }
  render() {
    const { params, location } = this.props,
      {
        name,
        symbol,
        price_usd,
        price_btc,
        percent_change_24h,
      } = location.state
    const newState = Object.assign({}, ...location.state, {
      'Market Cap': location.state.market_cap_usd,
      'Volume (24h)': location.state['24h_volume_usd'],
      'Circulating Supply': location.state.available_supply,
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
            {Object.entries(newState).map((el, i) => (
              <div key={i}>
                <TitleParams>{el[0]}</TitleParams>
                <div>
                  $ {this.commas(el[1])} {i !== 2 ? 'USD' : symbol}
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

const mapStateToProps = state => {
  return {
    params: coinParamsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  const actionsParam = coinParamsActions.coinParams
  return {
    requestCoinParams: params => {
      dispatch(actionsParam.requestCoinParams(params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinPage)
