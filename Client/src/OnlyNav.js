import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';


function MyNav() {

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="main-nav" id="navbar" >
                <Container>
                    <Nav.Link href="/">
                        <img
                            src={logo}
                            height="50"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Nav.Link>
                    <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
                        <Nav className="ml-auto">
                            <Nav.Link href="/" className="active">Home</Nav.Link>
                            <NavDropdown title="Sign Up" id="dropdown02" className="active">
                                <NavDropdown.Item href="/teacher">Teacher</NavDropdown.Item>
                                <NavDropdown.Item href="/student">Student</NavDropdown.Item>
                                <NavDropdown.Item href="/director">Director</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/login">Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default MyNav;