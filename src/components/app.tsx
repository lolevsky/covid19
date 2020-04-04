import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './navigation';

import LandingPage from './landing';
import HomePage from './home';

import * as ROUTES from '../constants/routes';
import { firebaseAnalytics } from './firebase/firebase';

class App extends React.Component{
  public componentDidMount() {
    firebaseAnalytics.logEvent('App - Loaded')
  }

  public render() {
    return (
      <Router>
        <div>
          <Navigation />
          <br />
          <Route exact path={ROUTES.LANDING} component={HomePage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.INFO} component={LandingPage} />
        </div>
      </Router>
   );
  }
}

export default App;