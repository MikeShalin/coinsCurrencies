import axios from 'axios'

export default (coin, convert, limit, aggregate, e) =>
  getResult(coin, convert, limit, aggregate, e)
    .then(response => ({
      status: 200,
      data: response.data.Data,
    }))
    .catch(error => ({
      status: 500,
      error: error,
    }))

export const getResult = (
  coin,
  convert,
  limit = 30,
  aggregate = 1,
  e = 'CCCAGG'
) =>
  axios.get(`https://min-api.cryptocompare.com/data/histoday?`, {
    params: {
      fsym: coin,
      tsym: convert,
      limit,
      aggregate,
      e,
    },
  })
