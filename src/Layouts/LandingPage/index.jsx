import React, { useState } from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { startGame } from '../../redux/actions';
import PropTypes from 'prop-types';
import { gameIdSelector } from '../../redux/selectors';
import { Redirect } from 'react-router-dom';

const LandingPage = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [idInput, setIdInput] = useState('');

  const handleCloseDialog = () => {
    setShowDialog(false);
    setIdInput('');
  };

  const handleStartGameWithId = () => {
    props.startGame({ gameId: idInput });
    handleCloseDialog();
  };

  if (props.gameId) {
    return <Redirect to="/game" />;
  }

  return (
    <Container>
      <Button variant="contained" onClick={() => setShowDialog(true)}>
        Enter game ID
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.startGame()}
      >
        Start a new game
      </Button>
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter an existing game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the game ID for the existing game.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="gameId"
            label="Game ID"
            type="text"
            fullWidth
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleStartGameWithId} color="secondary">
            Enter game
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

LandingPage.propTypes = {
  gameId: PropTypes.string,
  startGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gameId: gameIdSelector(state),
});

const mapDispatchToProps = {
  startGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
