import { createSelector } from 'reselect';

const selectGameDomain = (state) => state.game;

const selectBoardDomain = (state) => state.board;

const selectPlayerDomain = (state) => state.player;

export const playerIdSelector = createSelector(
  selectPlayerDomain,
  (subState) => subState.playerId
);

export const gameIdSelector = createSelector(
  selectGameDomain,
  (subState) => subState.id
);

export const gameIsLoadingSelector = createSelector(
  selectGameDomain,
  (subState) => subState.loading
);

export const gameBoardSelector = createSelector(
  selectBoardDomain,
  (subState) => subState.board
);
