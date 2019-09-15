import axios from 'axios'

import { apiCoinsList } from 'config/apiCoinsList'
import { success, fail } from 'config/networkStatus'

export default () =>
  getResult()
    .then(({ data }) => ({
      status: success,
      data,
    }))
    .catch(error => ({
      status: fail,
      error,
    }))

export const getResult = () => axios.get(apiCoinsList)
