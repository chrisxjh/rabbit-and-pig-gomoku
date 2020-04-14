import {
  actionTypes,
  startGameSuccess,
  requestUpdateSuccess,
  requestUpdateFailure,
} from './actions';
import { serverPost, serverGet, serverPut } from '../utils/utils';

const handleStartGame = (store, { payload }) => {
  const id = payload && payload.id;
  const params = new URLSearchParams();

  if (id) params.set('id', id);

  serverPost(`start?${params.toString()}`).then((res) => {
    store.dispatch(startGameSuccess(res.data));
  });
};

const handleRequestUpdate = (store, { payload }) => {
  const { gameId } = payload;

  serverGet(`${gameId}/update`).then((res) => {
    store.dispatch(requestUpdateSuccess(res.data));
  });
};

const handlePlay = (store, { payload }) => {
  const { gameId, playerId, x, y } = payload;

  serverPut(`${gameId}/play`, { playerId, x, y }).then((res) => {
    const { code, message, update } = res.data;
    if (code === 'ERROR') store.dispatch(requestUpdateFailure({ message }));
    else store.dispatch(requestUpdateSuccess(update));
  });
};

const handlers = {
  [actionTypes.START_GAME]: handleStartGame,
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
