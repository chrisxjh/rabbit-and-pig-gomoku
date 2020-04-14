import React from 'react';
import LandingPage from './Layouts/LandingPage';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import GameLayout from './Layouts/GameLayout';

function App() {
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

export default App;
