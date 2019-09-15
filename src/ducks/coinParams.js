import { Record } from 'immutable'
import 'regenerator-runtime/runtime'
import { createActions } from 'redux-actions'
import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import { createSelector } from 'reselect'

import getParams from 'common/getCoinData'
import { success, fail } from 'config/networkStatus'

/**
 * Constants
 * */
export const moduleName = 'coinParams'
const prefix = moduleName

export const REQUEST_COIN_PARAMS = `${prefix}/REQUEST_COIN_PARAMS`
export const FETCH_COIN_PARAMS = `${prefix}/FETCH_COIN_PARAMS`
export const FAILURE_COIN_PARAMS = `${prefix}/FAILURE_COIN_PARAMS`

/**
 * Reducer
 * */
export const coinParams = Record({
  data: null,
  error: null,
  fetching: null,
})

export const coinParamsReducer = (state = new coinParams(), action) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_COIN_PARAMS:
      return state.set('fetching', true)
    case FETCH_COIN_PARAMS:
      return state
        .set('data', payload)
        .set('error', false)
        .set('fetching', false)
    case FAILURE_COIN_PARAMS:
      return state
        .set('data', null)
        .set('error', payload)
        .set('fetching', false)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const coinParamsSelector = createSelector(
  stateSelector,
  state => state.data,
)

/**
 * Action Creators
 * */

export const coinParamsActions = createActions({
  [prefix]: {
    REQUEST_COIN_PARAMS: params => params,
    FETCH_COIN_PARAMS: data => data,
    FAILURE_COIN_PARAMS: error => error,
  },
})

/**
 * Sagas
 **/

const getCurrentTime = (time) => time < 10 ? `0${time}` : time

const Unix_timestamp = t => {
  const date = new Date(t * 1000)
  const day = getCurrentTime(date.getDate())
  const month = getCurrentTime(date.getMonth())
  return `${day}.${month}`
}

export function* requestCoinParamsSaga(action) {
  const { coin, convert } = action.payload
  const { fetchCoinParams, failureCoinParams } = coinParamsActions[prefix]
  const params = yield call(getParams, coin, convert)
  console.log('lolparams', params)
  
  if(params.status === success) {
    const data = params.data.map(el => ({
      ...el,
      time: Unix_timestamp(el.time),
    }))
  
    yield put(fetchCoinParams(data))
  }
  if(params.status === fail) {
    yield put(failureCoinParams(params.error.toString()))
  }
}

export const coinParamsSaga = function* () {
  yield takeEvery(REQUEST_COIN_PARAMS, requestCoinParamsSaga)
}
