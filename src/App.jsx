import React, { useEffect } from 'react';
import LandingPage from './Layouts/LandingPage';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import GameLayout from './Layouts/GameLayout';
import { connect } from 'react-redux';
import { logIn } from './redux/actions';
import PropTypes from 'prop-types';
import { playerIdSelector } from './redux/selectors';

function App({ logIn, playerId }) {
  useEffect(() => {
    if (!playerId) logIn();
  }, [playerId, logIn]);

  return (
    <BrowserRouter basename="/rabbit-and-pig-gomoku">
      <Switch>
        <Route path="/game">
          <GameLayout />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  playerId: PropTypes.string,
  logIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerId: playerIdSelector(state),
});

const mapDispatchToProps = {
  logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
