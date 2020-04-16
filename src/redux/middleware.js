import {
  actionTypes,
  startGameSuccess,
  requestUpdateSuccess,
  requestUpdateFailure,
  signUpSuccess,
  signUp,
  logInSuccess,
  restartGameSuccess,
  restartGameFailure,
  requestUpdate,
  startGameFailure,
  signUpFailure,
  logInFailure,
} from './actions';
import {
  serverPost,
  serverGet,
  serverPut,
  getPlayerId,
  setPlayerId,
  clearPlayerId,
} from '../utils/utils';
import { playerIdSelector } from './selectors';
import { SUCCESS } from '../common/codes';

const getParams = (store, config) => {
  const playerId = playerIdSelector(store.getState());
  const params = new URLSearchParams({ userId: playerId, ...config });
  return params;
};

const handleSignUp = (store) => {
  serverPost('/signup').then((res) => {
    const { data } = res;
    setPlayerId(data.userId);
    if (data.code === SUCCESS)
      store.dispatch(signUpSuccess({ userId: data.userId }));
    else store.dispatch(signUpFailure(data));
  });
};

const handleLogin = (store) => {
  const playerId = getPlayerId();
  if (!playerId) {
    return store.dispatch(signUp());
  }

  const params = new URLSearchParams({ userId: playerId });
  serverPost(`/login?${params.toString()}`).then((res) => {
    const { data } = res;
    if (data.code === SUCCESS)
      return store.dispatch(logInSuccess({ userId: data.userId }));
    else store.dispatch(logInFailure(data));

    clearPlayerId();
    store.dispatch(signUp());
  });
};

const handleStartGame = (store, { payload = {} }) => {
  const { gameId } = payload;
  const params = getParams(store, gameId ? { gameId } : {});

  serverPost(`/game/gomoku/start?${params.toString()}`).then((res) => {
    const { data } = res;
    if (data.code === SUCCESS) store.dispatch(startGameSuccess(data));
    else store.dispatch(startGameFailure(data));
  });
};

const handleRestartGame = (store, { payload }) => {
  const { gameId } = payload;
  const params = getParams(store, { gameId });

  serverPut(`/game/gomoku/restart?${params.toString()}`).then((res) => {
    const { data } = res;
    if (data.code === SUCCESS) {
      store.dispatch(restartGameSuccess());
      store.dispatch(requestUpdate({ gameId }));
    } else {
      store.dispatch(restartGameFailure(data));
    }
  });
};

const handleRequestUpdate = (store, { payload }) => {
  const params = getParams(store, { gameId: payload.gameId });

  serverGet(`/game/gomoku/update?${params.toString()}`).then((res) => {
    const {
      data: { code, updates },
    } = res;

    if (code === SUCCESS && updates)
      store.dispatch(requestUpdateSuccess({ updates }));
    else if (code !== SUCCESS) store.dispatch(requestUpdateFailure());
  });
};

const handlePlay = (store, { payload }) => {
  const { gameId, playerId, x, y } = payload;
  const params = getParams(store, { gameId, x, y });

  serverPut(`/game/gomoku/play?${params.toString()}`, { playerId, x, y }).then(
    (res) => {
      const { code, message, updates } = res.data;
      if (code === 'SUCCESS') store.dispatch(requestUpdateSuccess({ updates }));
      else store.dispatch(requestUpdateFailure({ code, message }));
    }
  );
};

const handlers = {
  [actionTypes.SIGN_UP]: handleSignUp,
  [actionTypes.LOG_IN]: handleLogin,
  [actionTypes.START_GAME]: handleStartGame,
  [actionTypes.RESTART_GAME]: handleRestartGame,
  [actionTypes.REQUEST_UPDATE]: handleRequestUpdate,
  [actionTypes.PLAY_MOVE]: handlePlay,
};

const gameMiddleware = (store) => (next) => (action) => {
  if (handlers[action.type]) {
    handlers[action.type](store, action);
  }

  next(action);
};

export default gameMiddleware;
