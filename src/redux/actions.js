export const actionTypes = {
  SIGN_UP: 'gomoku/SIGN_UP',
  SIGN_UP_SUCCESS: 'gomoku/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'gomoku/SIGN_UP_FAILURE',

  LOG_IN: 'gomoku/LOG_IN',
  LOG_IN_SUCCESS: 'gomoku/LOG_IN_SUCCESS',
  LOG_IN_FAILURE: 'gomoku/LOG_IN_FAILURE',

  START_GAME: 'gomoku/START_GAME',
  START_GAME_SUCCESS: 'gomoku/START_GAME_SUCCESS',
  START_GAME_FAILURE: 'gomoku/START_GAME_FAILURE',

  RESTART_GAME: 'gomoku/RESTART_GAME',
  RESTART_GAME_SUCCESS: 'gomoku/RESTART_GAME_SUCCESS',
  RESTART_GAME_FAILURE: 'gomoku/RESTART_GAME_FAILURE',

  REQUEST_UPDATE: 'gomoku/REQUEST_UPDATE',
  REQUEST_UPDATE_SUCCESS: 'gomoku/REQUEST_UPDATE_SUCCESS',
  REQUEST_UPDATE_FAILURE: 'gomoku/REQUEST_UPDATE_FAILURE',

  PLAY_MOVE: 'gomoku/PLAY_MOVE',
};

export const signUp = (payload) => ({
  type: actionTypes.SIGN_UP,
  payload,
});

export const signUpSuccess = (payload) => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload,
});

export const signUpFailure = (payload) => ({
  type: actionTypes.SIGN_UP_FAILURE,
  payload,
});

export const logIn = (payload) => ({
  type: actionTypes.LOG_IN,
  payload,
});

export const logInSuccess = (payload) => ({
  type: actionTypes.LOG_IN_SUCCESS,
  payload,
});

export const logInFailure = (payload) => ({
  type: actionTypes.LOG_IN_FAILURE,
  payload,
});

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

export const restartGame = (payload) => ({
  type: actionTypes.RESTART_GAME,
  payload,
});

export const restartGameSuccess = (payload) => ({
  type: actionTypes.RESTART_GAME_SUCCESS,
  payload,
});

export const restartGameFailure = (payload) => ({
  type: actionTypes.RESTART_GAME_FAILURE,
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
