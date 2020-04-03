import React from 'react';

import * as ROUTES from '../constants/routes';

import { Link } from 'react-router-dom'

import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={ROUTES.LANDING}>COVID19 Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Navigation;