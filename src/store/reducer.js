import { combineReducers } from 'redux';
import {
  coinParamsReducer,
  moduleName as coinParamsModule,
} from 'ducks/coinParams';
import { coinListReducer, moduleName as coinListModule } from 'ducks/coinList';

export default combineReducers({
  [coinParamsModule]: coinParamsReducer,
  [coinListModule]: coinListReducer,
});
