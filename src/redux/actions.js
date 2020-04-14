export const actionTypes = {
  START_GAME: 'gomoku/START_GAME',
  START_GAME_SUCCESS: 'gomoku/START_GAME_SUCCESS',
  START_GAME_FAILURE: 'gomoku/START_GAME_FAILURE',

  REQUEST_UPDATE: 'gomoku/REQUEST_UPDATE',
  REQUEST_UPDATE_SUCCESS: 'gomoku/REQUEST_UPDATE_SUCCESS',
  REQUEST_UPDATE_FAILURE: 'gomoku/REQUEST_UPDATE_FAILURE',

  PLAY_MOVE: 'gomoku/PLAY_MOVE',
};

export const startGame = (payload) => ({
  type: actionTypes.START_GAME,
  payload,
});

export const startGameSuccess = (payload) => ({
  type: actionTypes.START_GAME_SUCCESS,
  payload,
});

export const startGameFailure = (payload) => ({
  type: actionTypes.START_GAME_FAILURE,
  payload,
});

export const requestUpdate = (payload) => ({
  type: actionTypes.REQUEST_UPDATE,
  payload,
});

export const requestUpdateSuccess = (payload) => ({
  type: actionTypes.REQUEST_UPDATE_SUCCESS,
  payload,
});

export const requestUpdateFailure = (payload) => ({
  type: actionTypes.REQUEST_UPDATE_FAILURE,
  payload,
});

export const playMove = (payload) => ({
  type: actionTypes.PLAY_MOVE,
  payload,
});
