import React from 'react';

import { Container } from 'react-bootstrap';
import { firebaseAnalytics } from './firebase/firebase';

class AboutPage extends React.Component{

    public componentDidMount() {
        firebaseAnalytics.logEvent('LandingPage - loaded')
    }

    public render() {
        return (
            <Container>
                    <h1>Welcome to COVID19 info page</h1>
                    <p>It is not official page, data that presented coming from <a target="_blank" rel="noopener noreferrer" href="https://github.com/novelcovid/api">Novel Covid</a> API.</p>
            </Container>
    );
  }
}

export default AboutPage;