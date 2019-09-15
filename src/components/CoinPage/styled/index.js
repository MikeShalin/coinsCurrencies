import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex
  flex-direction: row
  margin: 20px
`

export const Title = styled.div`
  font-size: 24px
  margin-right: 40px
  font-weight: 700
`

export const TitleParams = styled.div`
  font-weight: 700
`

export const SubTitle = styled.div`
  font-size: 16px
  margin-right: 40px
`

export const Symbol = styled.span`
  color: #999
`

export const PriceBTC = styled.span`
  color: #999
`

export const USDContainer = styled.div`
  display: flex
  align-items: flex-end
`

export const PriceUSD = styled.div`
  font-size: 20px
  font-weight: 700
  margin-right: 3px
`

export const ListParams = styled.div`
  display: flex
  width: 60%
  justify-content: space-around
`
export const Home = styled(Link)`
  color: #000
  text-decoration: none
  &:hover {
    text-decoration: underline
  }
`