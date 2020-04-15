import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './redux/reducers';
import gameMiddleware from './redux/middleware';
import { ENV } from './configs/config';

export default function () {
  const middleware = [gameMiddleware];

  const composeEnhancers =
    ENV === 'dev'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}
