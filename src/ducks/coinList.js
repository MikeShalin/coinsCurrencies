import { Record, OrderedMap } from 'immutable';
import 'regenerator-runtime/runtime';
import { createActions } from 'redux-actions';
import { call, put, all, takeEvery } from 'redux-saga/effects';
import getParams from 'common/getParams';
import { createSelector } from 'reselect';
/**
 * Constants
 * */
export const moduleName = 'coinList';
const prefix = moduleName;

export const REQUEST_COIN_LIST = `${prefix}/REQUEST_COIN_LIST`;
export const FETCH_COIN_LIST = `${prefix}/FETCH_COIN_LIST`;
export const FAILURE_COIN_LIST = `${prefix}/FAILURE_COIN_LIST`;

/**
 * Reducer
 * */
export const coinList = Record({
  data: [],
  error: null,
  fetching: null,
});

export const coinListReducer = (state = new coinList(), action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_COIN_LIST:
      return state.set('fetching', true);
    case FETCH_COIN_LIST:
      return state
        .set('data', payload)
        .set('error', false)
        .set('fetching', false);
    case FAILURE_COIN_LIST:
      return state
        .set('data', null)
        .set('error', payload)
        .set('fetching', false);
    default:
      return state;
  }
};

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const coinListSelector = createSelector(
  stateSelector,
  state => state.data
);
// export const statusSelector = createSelector(
//   stateSelector,
//   state => state.status
// )
// export const resultSelector = createSelector(
//   stateSelector,
//   state => state.result
// )
// export const errorSelector = createSelector(
//   stateSelector,
//   state => state.error
// )
// export const fetchingSelector = createSelector(
//   stateSelector,
//   state => state.fetching
// )

/**
 * Action Creators
 * */

export const coinListActions = createActions({
  [prefix]: {
    REQUEST_COIN_LIST: params => params,
    FETCH_COIN_LIST: data => data,
    FAILURE_COIN_LIST: error => error,
  },
});

/**
 * Sagas
 **/

export function* requestCoinListSaga(action) {
  console.log('в саге coinList');
  const { start, limit, convert, id } = action.payload,
    { fetchCoinList, failureCoinList } = coinListActions[prefix],
    params = yield call(getParams, start, limit, convert, id);
  if (params.status === 200) yield put(fetchCoinList(params.data));
  if (params.status === 500)
    yield put(failureCoinList(params.error.toString()));
}

export const coinListSaga = function*() {
  yield takeEvery(REQUEST_COIN_LIST, requestCoinListSaga);
};
