import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { Loading } from '../components/ui/Loading';
import { TeamScreen } from '../components/team/TeamScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { HeroScreen } from '../components/hero/HeroScreen';
import { startLoadingHeroes } from '../actions/team';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingHeroes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <Loading />
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path='/auth'
            isAuthenticated={isLoggedIn}
            component={AuthRouter}
          />
          <Switch>
            <PrivateRoute
              exact path='/'
              isAuthenticated={isLoggedIn}
              component={TeamScreen}
            />
            <PrivateRoute
              exact path="/hero/:heroId"
              isAuthenticated={isLoggedIn}
              component={HeroScreen}
            />
            <PrivateRoute
              exact path="/search"
              isAuthenticated={isLoggedIn}
              component={SearchScreen}
            />
            <Redirect to="/" />
          </Switch>
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}