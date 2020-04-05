import React from 'react';

import * as ROUTES from '../constants/routes';

import { Link } from 'react-router-dom'

import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => (
    
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
            <Navbar.Brand as={Link} to={ROUTES.ABOUT}>COVID19 Data</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to={ROUTES.REPORT}>Report</Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.MAP}>Map</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
);

export default Navigation;