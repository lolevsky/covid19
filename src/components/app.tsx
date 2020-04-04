import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './navigation';

import LandingPage from './landing';
import ReportPage from './report';
import MapPage from './map';

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
          <Route exact path={ROUTES.LANDING} component={ReportPage} />
          <Route path={ROUTES.REPORT} component={ReportPage} />
          <Route path={ROUTES.INFO} component={LandingPage} />
          <Route path={ROUTES.MAP} component={MapPage} />
        </div>
      </Router>
   );
  }
}

export default App;