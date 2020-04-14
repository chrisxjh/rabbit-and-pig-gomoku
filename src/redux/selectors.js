import { createSelector } from 'reselect';

const selectGameDomain = (state) => state.game;

const selectBoardDomain = (state) => state.board;

export const gameIdSelector = createSelector(
  selectGameDomain,
  (subState) => subState.id
);

export const playerIdSelector = createSelector(
  selectGameDomain,
  (subState) => subState.playerId
);

export const gameIsLoadingSelector = createSelector(
  selectGameDomain,
  (subState) => subState.loading
);

export const gameBoardSelector = createSelector(
  selectBoardDomain,
  (subState) => subState.board
);

export const boardDimensionSelector = createSelector(
  selectBoardDomain,
  (subState) => subState.dimension
);
