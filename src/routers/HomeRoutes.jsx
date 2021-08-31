import React from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import { HeroScreen } from '../components/hero/HeroScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { TeamScreen } from '../components/team/TeamScreen';
import { Navbar } from '../components/ui/Navbar';

export const HomeRoutes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={TeamScreen} />
        <Route exact path="/hero/:heroId" component={HeroScreen} />
        <Route exact path="/search" component={SearchScreen} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}