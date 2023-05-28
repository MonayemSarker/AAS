import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../background1.jpg';

import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MyNav from './NavBar';

export function AdminResetPassword() {
    

    const { email } = useParams();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();


        console.log("Form submitted:", {
            password,
            newPassword,
            confirmNewPassword,
        });
        
        Axios.put(`http://localhost:12280/user/${email}/resetPassword`, {
            email: email,
            password: password,
            password1: newPassword,
            password2: confirmNewPassword,
        }).then((response) => {
            toast.error(response.data.error);
            toast.success(response.data.message);
        }
        )


    };

    const [authState, setAuthState] = useState(false);
    const authenticate = (email) => {
        Axios.get("http://localhost:12280/auth/", {
            headers: {
                accessToken: localStorage.getItem("accessToken")

            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState(false);
            } else {
                if ( response.data.email == email) {
                    setAuthState(true);
                }
            }
        });
    }

    useEffect(() => {
        authenticate(email);
    }, []);

    return (
        <>
            {
                authState && (
                    <div className="page">


                       <MyNav/>
                        <div style={{ width: "70%", margin: "auto", height: "750px", marginTop: "10rem" }}>
                            <ToastContainer />
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter current password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)} required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password "
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)} required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formConfirmNewPassword">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password again"
                                        value={confirmNewPassword}
                                        onChange={(event) => setConfirmNewPassword(event.target.value)} required
                                    />
                                </Form.Group>

                                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                                    <Button variant="primary" type="submit" >

                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>

                      
                    </div>
                )
            }
        </>
    );
}

export default AdminResetPassword;