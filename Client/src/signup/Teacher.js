import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import './signup.css';
import MyNav from '../OnlyNav';

export function Teacher() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = async (event) => {
    event.preventDefault();
    const res = await Axios.post('http://localhost:12280/user/generate-otp', { email });

    toast.info(res.data.message);
    setOtpSent(true);
  };
  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    const res = await Axios.post('http://localhost:12280/user/verify-otp', { email, otp });
    if (res.data.message == 'Invalid OTP') {
      toast.error(res.data.message);
      setTimeout(function () {
        window.location.reload();
      }, 5000);
    }
    else {
      setOtpVerified(true);
      toast.info(res.data.message);
    }
  };


  const handleSignUp = (event) => {
    event.preventDefault();


    Axios.post('http://localhost:12280/user/add', {
      email: email,
      name: name,
      phone: phone,
      password: password,
      userType: "Teacher"
    }).then((response) => {
      console.log(response);

      if (response.data == "Duplicate") {
        toast.error("User Already Exits")
        setTimeout(function () {
          window.location.reload();
        }, 5000);
      } else {
        Axios.post('http://localhost:12280/teacher/add', {
          name: name,
          UserEmail: email,
          phoneNum: phone,
        }).then((response) => {
          console.log(response.data)
          toast.success("Account Creation Successful \n Wait for Verification");
          setTimeout(function () {
            window.location.reload();
          }, 5000);
        })
      }

    });




  };




  return (
    <div className="page" style={{ backgroundImage: `url(${background1})` }} >
 <MyNav/>

      

      <Container className="d-flex justify-content-center align-items-center" style={{ maxWidth: '400px', height: '80vh', backgroundColor: 'transparent' }}>
        <ToastContainer />
        <Form onSubmit={handleSignUp} className="p-4 text-center" style={{ backgroundColor: 'transparent', borderRadius: '5px', width: '100%' }}>
          {!otpSent && (
            <div>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              <Button variant="primary" type="button" onClick={handleSendOtp} className="mx-auto my-4">
                Send OTP
              </Button>
            </div>
          )}

          {otpSent && !otpVerified && (
            <div>
              <Form.Group controlId="formBasicOtp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleVerifyOtp} className="mx-auto my-4">
                Verify OTP
              </Button>
            </div>
          )}

          {otpVerified && (
            <div>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="mx-auto" style={{ marginTop: '125px' }}>
                Sign Up
              </Button>
            </div>
          )}
        </Form>
      </Container>

    
    </div>
  );
}

export default Teacher;