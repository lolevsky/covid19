import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './navigation';

import LandingPage from './landing';
import HomePage from './home';

import * as ROUTES from '../constants/routes';

const App = () => (
    <Router>
      <div>
        <Navigation />
        <hr />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
      </div>
    </Router>
  );
  export default App;