import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyNav from '../NavBar1';

export function DirectorEditInfo() {
    
    const [gender, setGender] = useState("");
    
    const [currentAddr, setCurrentAddress] = useState("");
    const [permanentAddr, setPermanentAddress] = useState("");
    const [name, setName] = useState('');
    const {email1 } = useParams();
    const [phoneNum, setPhone] = useState('');

    useEffect(() => {
        Axios.get(`http://localhost:12280/director/${email1}`).then((response) => {
            setPhone(response.data.phoneNum);
            setName(response.data.name);
            setGender(response.data.gender);
            setCurrentAddress(response.data.currentAddr);
            setPermanentAddress(response.data.permanentAddr);
           
        });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email1);
        const directorData = {
          name,
          gender,
          phoneNum,
          currentAddr,
          permanentAddr
        };
      
        Axios.put(`http://localhost:12280/director/${email1}`, directorData)
          .then(response => {
            toast.success(response.data);
          })
          .catch(error => {
            toast.error(error);
          });
      };

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
                if (response.data.userType == userType && response.data.email == email1) {
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
                    <div className="page" >
                        <MyNav/>
                        <ToastContainer />
                        <div style={{ width: "70%", margin: "auto", marginTop: '10px', marginBottom: '10px' }}>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="Text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={phoneNum}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                    >
                                        <option value="">Choose gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Control>
                                </Form.Group>

                               



                                <Form.Group controlId="formCurrentAddress">
                                    <Form.Label>Current Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter current address"
                                        value={currentAddr}
                                        onChange={(event) => setCurrentAddress(event.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPermanentAddress">
                                    <Form.Label>Permanent Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter permanent address"
                                        value={permanentAddr}
                                        onChange={(event) => setPermanentAddress(event.target.value)}
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

export default DirectorEditInfo;