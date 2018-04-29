import axios from 'axios';

export default (start = 0, limit = 100, convert = 'RUB', id = null) =>
  getResult(start, limit, convert, id)
    .then(response => ({
      status: 200,
      data: response.data,
    }))
    .catch(error => ({
      status: 500,
      error: error,
    }));

export const getResult = (start = 0, limit = 100, convert = 'RUB', id) =>
  axios.get(`https://api.coinmarketcap.com/v1/ticker/${id ? id + '/' : ''}`, {
    params: {
      start,
      limit,
      convert,
    },
  });
