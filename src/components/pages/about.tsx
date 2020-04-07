import React from 'react';

import { Container } from 'react-bootstrap';
import { firebaseAnalytics } from '../firebase/firebase';

class AboutPage extends React.Component{

    public componentDidMount() {
        firebaseAnalytics.setCurrentScreen('About')
        firebaseAnalytics.logEvent('About - loaded')
    }

    public render() {
        return (
            <Container>
                    <h1>Welcome to COVID19 info page</h1>
                    <p>It is not official page, data that presented coming from <a target="_blank" rel="noopener noreferrer" href="https://github.com/novelcovid/api">Novel Covid</a> API.</p>
                    <h3>Open source librries that used for this project are</h3>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React</a></p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://react-bootstrap.github.io/">React bootstrap</a></p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://recharts.org/">Recharts</a></p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://firebase.google.com/">Firebase</a></p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie#readme">Universal cookie</a></p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/fullstackreact/google-maps-react#readme">Google maps react</a></p>
                    <br/><br/>
                    <p>Made by <a target="_blank" rel="noopener noreferrer" href="https://olevsky.me">Leonid Olevsky</a></p>
            </Container>
    );
  }
}

export default AboutPage;