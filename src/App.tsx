import React, { lazy, Suspense, FC, useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from './rootReducer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Editor from './features/entry/Editor'
const Auth = lazy(() => import('./features/auth/Auth'));
const Home = lazy(() => import('./features/home/Home'));
const App: FC = () => {
  const isLogedIn = useSelector((state: RootState) => state.auth.isAuthenticated)
  return (
    <div className="App">
      <Router>
        <Route exact path="/">

          <Suspense fallback={<p>Loading...</p>}>

            {isLogedIn ? <Home /> : <Auth />}
          </Suspense>
        </Route>

      </Router>
    </div>
  );
}

export default App;
