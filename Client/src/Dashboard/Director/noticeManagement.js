import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyNav from '../NavBar';

export function ManageNotice() {
   
    const [notice, setNotice] = useState("");

    const handleSubmit = (event) => {
        if (notice.trim() === '') {
            toast.error('Please wite the notice');
            return;
          }
          Axios.post(`http://localhost:12280/notice/director`, {notice})
            .then(response => {
              toast.success("Notice Sent!");
            })
            .catch(error => {
              toast.error(error);
            });
            console.log(notice)
        }
        
    
    const { email } = useParams();
    
    const [authState, setAuthState] = useState(false);
    const authenticate = (userType) => {
        Axios.get("http://localhost:12280/auth/", {
            headers: {
                accessToken: localStorage.getItem("accessToken")

            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState(false);
            } else {
                if (response.data.userType == userType && response.data.email == email) {
                    setAuthState(true);
                }
            }
        });
    }

    useEffect(() => {
        authenticate("Director");
    }, []);
    return (
        <>
            {
                authState && (
                    <div className="page">
                        <MyNav/>
                        <section>
                        <div style={{ width: "70%", margin: "auto", height: "750px", marginTop: "10rem" }}>
                            <ToastContainer />
                            <Form >

                                <Form.Group controlId="formNotice">
                                    <Form.Label>Notice</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter the notice"
                                        value={notice}
                                        onChange={(event) => setNotice(event.target.value)} required
                                        style={{ height:"200px" }}
                                    />
                                </Form.Group>
                                

                                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                                    <Button variant="primary" type="button" onClick={handleSubmit}>
                                            Send
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        </section>
                        



                       
                    </div>

                )
            }
        </>
    );


} export default ManageNotice;