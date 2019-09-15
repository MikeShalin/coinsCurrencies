import { Record } from 'immutable'
import 'regenerator-runtime/runtime'
import { createActions } from 'redux-actions'
import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import { createSelector } from 'reselect'

import getList from 'common/getList'
import { success, fail } from 'config/networkStatus'

/**
 * Constants
 * */
export const moduleName = 'coinList'
const prefix = moduleName

export const REQUEST_COIN_LIST = `${prefix}/REQUEST_COIN_LIST`
export const FETCH_COIN_LIST = `${prefix}/FETCH_COIN_LIST`
export const FAILURE_COIN_LIST = `${prefix}/FAILURE_COIN_LIST`

/**
 * Reducer
 * */
export const coinList = Record({
  data: [],
  error: null,
  fetching: null,
})

export const coinListReducer = (state = new coinList(), action) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_COIN_LIST:
      return state.set('fetching', true)
    case FETCH_COIN_LIST:
      return state
        .set('data', payload)
        .set('error', false)
        .set('fetching', false)
    case FAILURE_COIN_LIST:
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
export const coinListSelector = createSelector(
  stateSelector,
  state => state.data,
)

/**
 * Action Creators
 * */

export const coinListActions = createActions({
  [prefix]: {
    REQUEST_COIN_LIST: params => params,
    FETCH_COIN_LIST: data => data,
    FAILURE_COIN_LIST: error => error,
  },
})

/**
 * Sagas
 **/

export function* requestCoinListSaga(action) {
  const { fetchCoinList, failureCoinList } = coinListActions[prefix]
  const params = yield call(getList)
  if(params.status === success) yield put(fetchCoinList(params.data))
  if(params.status === fail) {
    yield put(failureCoinList(params.error.toString()))
  }
}

export const coinListSaga = function* () {
  yield takeEvery(REQUEST_COIN_LIST, requestCoinListSaga)
}
