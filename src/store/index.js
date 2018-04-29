import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from 'store/reducer';
import createSagaMiddleware from 'redux-saga';
import saga from 'store/saga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = applyMiddleware(sagaMiddleware);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(enhancer));

  sagaMiddleware.run(saga);

  return store;
}
