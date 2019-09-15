import React, { Component } from 'react'
import CoinPage from 'components/CoinPage/'
import { connect } from 'react-redux'
import { coinListActions, coinListSelector } from 'ducks/coinlist'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const List = styled.ul`
  list-style: none;
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ListItem = styled.li`
  margin-bottom: 5px;
`

const CoinLink = styled(Link)`
  color: #000;
  text-decoration: none;
  &:hover {
    border-bottom: 1px solid black;
  }
`

export class CoinsList extends Component {
  componentDidMount() {
    const { requestCoinList } = this.props
    requestCoinList()
    document.title = 'Coins list'
  }
  
  render() {
    const { coinList } = this.props
    return (
      <MainWrapper>
        <span>
          Select the coin:
        </span>
        <List>
          {coinList.map((coin, i) => (
            <ListItem key={i}>
              <CoinLink
                to={{ pathname: `/coins/${coin.symbol}`, state: coin }}
                component={CoinPage}
              >
                {coin.name}
              </CoinLink>
            </ListItem>
          ))}
        </List>
      </MainWrapper>
    )
  }
}

const mapStateToProps = state => ({
  coinList: coinListSelector(state),
})

const mapDispatchToProps = dispatch => {
  const actionsList = coinListActions.coinList
  return {
    requestCoinList: () => {
      dispatch(actionsList.requestCoinList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)
