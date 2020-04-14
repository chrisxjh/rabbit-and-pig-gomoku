import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestUpdate, playMove } from '../../redux/actions';
import {
  gameIdSelector,
  gameBoardSelector,
  boardDimensionSelector,
  playerIdSelector,
} from '../../redux/selectors';
import { Redirect } from 'react-router-dom';
import { Container, makeStyles, Typography } from '@material-ui/core';

const UPDATE_INTERVAL = 2000;

const cellSize = 28;
const clickableSize = 14;

const colorMapper = ['none', '#000', '#fff'];

const useStyles = makeStyles((theme) => ({
  boardContainer: {
    position: 'relative',
  },
  arenaTable: {
    border: '1px solid #444',
    borderCollapse: 'collapse',
    boxSizing: 'border-box',
  },
  cell: {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    border: '1px solid #444',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(241, 236, 211)',
  },
  spot: {
    display: 'inline-block',
    position: 'absolute',
    borderRadius: '50%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    width: `${clickableSize}px`,
    height: `${clickableSize}px`,
    border: '1px solid transparent',
  },
}));

const GameLayout = (props) => {
  const {
    gameId,
    requestUpdate,
    playMove,
    board,
    boardDimension,
    playerId,
  } = props;
  const classNames = useStyles();

  useEffect(() => {
    if (gameId) {
      requestUpdate({ gameId });

      const interval = setInterval(() => {
        requestUpdate({ gameId });
      }, UPDATE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [gameId, requestUpdate]);

  if (!gameId) return <Redirect to="/" />;

  const handleCellClick = (x, y) => {
    playMove({ gameId, playerId, x, y });
  };

  const gameBoardSpots = new Array(boardDimension * boardDimension)
    .fill()
    .map((column, i) => {
      const x = i % boardDimension;
      const y = Math.floor(i / boardDimension);

      return {
        x,
        y,
        top: `${(y + 1) * cellSize - clickableSize / 2}px`,
        left: `${(x + 1) * cellSize - clickableSize / 2}px`,
        value: null,
      };
    });

  board.forEach((player, i) => {
    if (player === null) return;

    gameBoardSpots[i].value = player;
  });

  const gameArena = (
    <table className={classNames.arenaTable}>
      <tbody>
        {new Array(boardDimension + 1).fill().map((row, i) => {
          return (
            <tr key={i}>
              {new Array(boardDimension + 1).fill().map((col, j) => (
                <td className={classNames.cell} key={j} />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <Container>
      <Typography variant="h5">Game ID: {gameId}</Typography>
      <br />
      <div className={classNames.boardContainer}>
        <div>
          {gameBoardSpots.map((spot, i) => (
            <span
              key={i}
              className={classNames.spot}
              style={{
                top: spot.top,
                left: spot.left,
                backgroundColor: colorMapper[spot.value],
                borderColor: spot.value === null ? 'none' : '#555',
              }}
              onClick={() => handleCellClick(spot.x, spot.y)}
            />
          ))}
        </div>
        {gameArena}
      </div>
    </Container>
  );
};

GameLayout.propTypes = {
  gameId: PropTypes.string,
  playerId: PropTypes.number,
  board: PropTypes.array,
  boardDimension: PropTypes.number,
  requestUpdate: PropTypes.func.isRequired,
  playMove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gameId: gameIdSelector(state),
  playerId: playerIdSelector(state),
  board: gameBoardSelector(state),
  boardDimension: boardDimensionSelector(state),
});

const mapDispatchToProps = {
  requestUpdate,
  playMove,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameLayout);
