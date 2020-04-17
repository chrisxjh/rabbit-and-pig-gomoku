import { combineReducers } from 'redux';
import { actionTypes } from './actions';

const initialGameState = {
  id: null,
  loading: false,
};

const game = (state = initialGameState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.START_GAME:
      return { ...state, id: null, loading: true };

    case actionTypes.START_GAME_SUCCESS:
      return {
        ...state,
        id: payload.id,
        playerId: payload.playerId,
        loading: false,
      };

    case actionTypes.END_GAME_SUCCESS:
    case actionTypes.START_GAME_FAILURE:
      return { ...state, id: null, loading: false };

    default:
      break;
  }

  return { ...state };
};

const initialBoardState = {
  board: [],
  loading: false,
  errorMessage: null,
};

const board = (state = initialBoardState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.REQUEST_UPDATE:
      return { ...state, loading: true };

    case actionTypes.REQUEST_UPDATE_SUCCESS: {
      const boardUpdates = payload.updates.filter((u) =>
        ['board', 'move'].includes(u.type)
      );

      if (boardUpdates.length === 0) break;

      const oldBoard = state.board.map((r) => r.slice());
      const newBoard = boardUpdates.reduce((board, update) => {
        if (update.type === 'board') {
          return update.board;
        } else if (update.type === 'move') {
          board[update.y][update.x] = update.value;
        }

        return board;
      }, oldBoard);

      return {
        ...state,
        loading: false,
        board: newBoard,
      };
    }
    case actionTypes.REQUEST_UPDATE_FAILURE:
      return { ...state, loading: false, errorMessage: payload.message };

    default:
      break;
  }

  return { ...state };
};

const initialPlayerState = {
  playerId: null,
  loading: false,
};

const player = (state = initialPlayerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SIGN_UP:
      return { ...state, loading: true };

    case actionTypes.LOG_IN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
      return { ...state, loading: false, playerId: payload.userId };

    case actionTypes.SIGN_UP_FAILURE:
      return { ...state, loading: false };

    default:
      break;
  }

  return { ...state };
};

export default combineReducers({ game, board, player });
