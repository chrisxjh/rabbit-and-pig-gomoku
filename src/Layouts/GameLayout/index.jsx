import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestUpdate, playMove, restartGame } from '../../redux/actions';
import {
  gameIdSelector,
  gameBoardSelector,
  playerIdSelector,
} from '../../redux/selectors';
import { Redirect } from 'react-router-dom';
import { Container, makeStyles, Typography, Button } from '@material-ui/core';

const UPDATE_INTERVAL = 2000;

const cellSize = 28;
const clickableSize = 14;

const colorMapper = ['#000', '#fff'];

const useStyles = makeStyles({
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
});

const GameLayout = (props) => {
  const {
    gameId,
    requestUpdate,
    restartGame,
    playMove,
    board,
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

  const n = board.length;
  const m = (board[0] || []).length;
  const gameArena = [];

  for (let i = 0; i <= n; ++i) {
    const row = [];
    for (let j = 0; j <= m; ++j) {
      row.push(<td key={j} className={classNames.cell} />);
    }
    gameArena.push(<tr key={i}>{row}</tr>);
  }

  return (
    <Container>
      <Typography variant="h5">Game ID: {gameId}</Typography>
      <Button onClick={() => restartGame({ gameId })}>Restart</Button>
      <br />
      <div className={classNames.boardContainer}>
        <div>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <span
                key={`${x},${y}`}
                className={classNames.spot}
                style={{
                  top: `${(y + 1) * cellSize - clickableSize / 2}px`,
                  left: `${(x + 1) * cellSize - clickableSize / 2}px`,
                  backgroundColor: colorMapper[cell],
                  borderColor: ![0, 1].includes(cell) ? 'transparent' : '#555',
                }}
                onClick={() => handleCellClick(x, y)}
              />
            ))
          )}
        </div>
        <table className={classNames.arenaTable}>
          <tbody>{gameArena}</tbody>
        </table>
      </div>
    </Container>
  );
};

GameLayout.propTypes = {
  gameId: PropTypes.string,
  playerId: PropTypes.string,
  board: PropTypes.arrayOf(PropTypes.array),
  requestUpdate: PropTypes.func.isRequired,
  playMove: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gameId: gameIdSelector(state),
  playerId: playerIdSelector(state),
  board: gameBoardSelector(state),
});

const mapDispatchToProps = {
  requestUpdate,
  playMove,
  restartGame,
};
export default connect(mapStateToProps, mapDispatchToProps)(GameLayout);
