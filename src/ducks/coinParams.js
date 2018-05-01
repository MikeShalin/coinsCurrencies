import { Record, OrderedMap } from 'immutable'
import 'regenerator-runtime/runtime'
import { createActions } from 'redux-actions'
import { call, put, all, takeEvery } from 'redux-saga/effects'
import getParams from 'common/getCoinData'
import { createSelector } from 'reselect'
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
  state => state.data
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

const Unix_timestamp = t => {
  const date = new Date(t * 1000),
    day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  return `${day}.${month}`
}

export function* requestCoinParamsSaga(action) {
  const { coin, convert } = action.payload,
    { fetchCoinParams, failureCoinParams } = coinParamsActions[prefix],
    params = yield call(getParams, coin, convert)

  const data = params.data.map(el => ({
    ...el,
    time: Unix_timestamp(el.time),
  }))

  if (params.status === 200) yield put(fetchCoinParams(data))
  if (params.status === 500)
    yield put(failureCoinParams(params.error.toString()))
}

export const coinParamsSaga = function*() {
  yield takeEvery(REQUEST_COIN_PARAMS, requestCoinParamsSaga)
}
