import { combineReducers } from 'redux';
import { actionTypes } from './actions';

const initialGameState = {
  id: null,
  playerId: null,
  loading: false,
};

const game = (state = initialGameState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.START_GAME:
      return { ...state, id: null, playerId: null, loading: true };

    case actionTypes.START_GAME_SUCCESS:
      return {
        ...state,
        id: payload.id,
        playerId: payload.playerId,
        loading: false,
      };

    case actionTypes.START_GAME_FAILURE:
      return { ...state, id: null, playerId: null, loading: false };

    default:
      break;
  }

  return { ...state };
};

const initialBoardState = {
  board: [],
  loading: false,
  dimension: 0,
  errorMessage: null,
};

const board = (state = initialBoardState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.REQUEST_UPDATE:
      return { ...state, loading: true };

    case actionTypes.REQUEST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        board: payload.board || [],
        dimension: payload.dimension,
      };

    case actionTypes.REQUEST_UPDATE_FAILURE:
      return { ...state, loading: false, errorMessage: payload.message };

    default:
      break;
  }

  return { ...state };
};

export default combineReducers({ game, board });
