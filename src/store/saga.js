import { all } from 'redux-saga/effects';
import { coinParamsSaga } from 'ducks/coinParams';
import { coinListSaga } from 'ducks/coinList';

export default function*() {
  yield all([coinParamsSaga(), coinListSaga()]);
}
