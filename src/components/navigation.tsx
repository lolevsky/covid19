import React from 'react';

import * as ROUTES from '../constants/routes';

import { Link } from 'react-router-dom'
import {
    EmailShareButton,
    FacebookShareButton,
    LineShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    EmailIcon,
    LineIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

  import { firebaseAnalytics } from './firebase/firebase';

import { Navbar, Nav, Container } from 'react-bootstrap';

const shareData = {
    url: 'https://covid19-info-data.web.app',
    title: 'COVID19 information page, check infected countries around the world',
    body: 'COVID19 graphical representation by country. You can select any country in the world and see the impact of the epidemic',
    subject: 'Website for keep updated of COVID19',
    quote: 'Keep updated of COVID19! You can select any country in the world and see the impact of the epidemic',
    hashtag: 'COVID19 COVID EPIDEMIC'
};

class Navigation extends React.Component {
    public render() {
    return ( <Navbar 
        bg="primary" 
        variant="dark" 
        expand="sm" 
        sticky="top"
        collapseOnSelect>
        <Container>
        <Navbar.Brand as={Link} to={ROUTES.ABOUT}>COVID19 Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to={ROUTES.REPORT}>Report</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.MAP}>Map</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.ABOUT}>About</Nav.Link>
            </Nav>
                <EmailShareButton
                    url= {shareData.url}
                    title= {shareData.title}
                    body= {shareData.body}
                    separator= ':: '
                    subject= {shareData.subject}
                    onClick= {() => firebaseAnalytics.logEvent('Share email')}>
                    <EmailIcon size={42} round />
                </EmailShareButton> 
                <FacebookShareButton
                    url= {shareData.url}
                    title= {shareData.title}
                    quote= {shareData.quote}
                    hashtag= {shareData.hashtag}
                    onClick= {() => firebaseAnalytics.logEvent('Share Facebook')}>
                    <FacebookIcon size={42} round />
                </FacebookShareButton> 
                <LinkedinShareButton
                    url= {shareData.url}
                    title= {shareData.title}
                    source= {shareData.url}
                    onClick= {() => firebaseAnalytics.logEvent('Share Linkedin')}>
                    <LinkedinIcon size={42} round />
                </LinkedinShareButton> 
                <LineShareButton
                    url= {shareData.url}
                    title= {shareData.title}
                    onClick= {() => firebaseAnalytics.logEvent('Share Line')}>
                    <LineIcon size={42} round />
                </LineShareButton> 
                <TelegramShareButton
                    url= {shareData.url}
                    title= {shareData.title}
                    onClick= {() => firebaseAnalytics.logEvent('Share Telegram')}>
                    <TelegramIcon size={42} round />
                </TelegramShareButton> 
                <TwitterShareButton
                    url= {shareData.url}
                    title= {shareData.title}
                    hashtags= {shareData.hashtag.split(" ")}
                    via='LeonidOlevsky'
                    onClick= {() => firebaseAnalytics.logEvent('Share Twitter')}>
                    <TwitterIcon size={42} round />
                </TwitterShareButton> 
                <WhatsappShareButton
                    url= {shareData.url}
                    title= {shareData.title}
                    separator=' '
                    onClick= {() => firebaseAnalytics.logEvent('Share Whatsapp')}>
                    <WhatsappIcon size={42} round />
                </WhatsappShareButton> 
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );}
}

export default Navigation;