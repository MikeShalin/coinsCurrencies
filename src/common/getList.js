import axios from 'axios'

export default () =>
  getResult()
    .then(response => ({
      status: 200,
      data: response.data,
    }))
    .catch(error => ({
      status: 500,
      error: error,
    }))

export const getResult = () =>
  axios.get(`https://api.coinmarketcap.com/v1/ticker/`)

// https://min-api.cryptocompare.com/data/histoday?fsym=GBP&tsym=USD&limit=30&aggregate=1&e=CCCAGG
