import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import {Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.jpg';
import ResetPass from '../ResetPass.png';
import editInfo from '../editInfo.png';
import notification from '../notification.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function MyNav() {

  const [showAlert, setShowAlert] = useState(false);

  function handleLogout() {
    setShowAlert(true);

  }
  function handleConfirmLogout(confirm) {
    setShowAlert(false);
    if (confirm) {
      // Perform logout logic here
      console.log("Logging out...");

      window.location.href = "/";
    }
  }
  const [adminUserType, setAdminUserType] = useState("");
  const { email1 } = useParams();
  const [authState, setAuthState] = useState(false);
  const authenticate = (email1) => {
    Axios.get("http://localhost:12280/auth/", {
      headers: {
        accessToken: localStorage.getItem("accessToken")

      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        if (response.data.email == email1) {
          setAuthState(true);
          setAdminUserType(response.data.userType);
        }

      }
    });
  }

  useEffect(() => {
    authenticate(email1);
  }, []);
  return (
    <>
      {
        authState && (
          <section class="okay">
            <Navbar collapseOnSelect expand="lg" className="main-nav" id="navbar" >
              <Container>
                <Navbar.Brand as={Link} to={`/${adminUserType}/${email1}`}>
                  <img
                    src={logo}
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logo"
                  />
                </Navbar.Brand>
                <Nav.Link as={Link} to={`/${adminUserType}/${email1}`} className="active">Dashboard</Nav.Link>

                <Navbar.Collapse id="navbarsExample09" className="justify-content-end">
                 
                  <Nav className="ml-auto">
                    <NavDropdown title="Settings" id="dropdown02">
                      <NavDropdown.Item as={Link} to={`/${email1}/ResetPassword`}>
                        <img src={ResetPass} height="30" width="40" /> Reset Password
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={`/${adminUserType}/${email1}/EditInfo`}>
                        <img src={editInfo} height="30" width="40" /> Update Information
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={`/${email1}/notification`}>
                        <img src={notification}  height="30" width="40"/> Notifications
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </Nav>
                  {showAlert && (
                    <div className="alert-container">
                      <div className="alert alert-warning bg-transparent" >
                        <p>Are you sure you want to log out?</p>
                        <button
                          className="btn btn-danger mr-2"
                          onClick={() => handleConfirmLogout(true)}
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleConfirmLogout(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}

                </Navbar.Collapse>
              </Container>
            </Navbar>
          </section>
        )
      }
    </>
  );
}
export default MyNav;