import axios from 'axios'
import get from 'lodash/get'

import {
  apiCoinData,
  defaultLimit,
  defaultAggr,
  defaultColor
} from 'config/apiCoinData'
import { success, fail } from 'config/networkStatus'

export default (
  coin,
  convert,
  limit,
  aggregate,
) =>
  getResult(
    coin,
    convert,
    limit,
    aggregate,
  )
    .then(({ data }) => ({
      status: success,
      data: get(data, 'Data'),
    }))
    .catch(error => ({
      status: fail,
      error,
    }))

export const getResult = (
  coin,
  convert,
  limit = defaultLimit,
  aggregate = defaultAggr,
  e = defaultColor,
) =>
  axios.get(apiCoinData, {
    params: {
      fsym: coin,
      tsym: convert,
      limit,
      aggregate,
      e,
    },
  })
