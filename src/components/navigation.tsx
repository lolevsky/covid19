import React from 'react';

import * as ROUTES from '../constants/routes';

import { Link } from 'react-router-dom'

import { Navbar, Nav, Container } from 'react-bootstrap';

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
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );}
}

export default Navigation;