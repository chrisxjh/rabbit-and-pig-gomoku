import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './redux/reducers';
import gameMiddleware from './redux/middleware';

export default function () {
  const middleware = [gameMiddleware];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}
