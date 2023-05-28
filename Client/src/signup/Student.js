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

export function Student() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fileDetails, setFileDetails] = useState();
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [classRoll, setClassRoll] = useState('');
  const [semester, setSemester] = useState('');

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
  //

  const onChangePicture = (e) => {
    console.log(e.target.files[0]);
    setFileDetails(e.target.files[0]);
  }
  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, Phone: ${phone}, Email: ${email}, Password: ${password}`);
  
    const config = {
      headers: {
        "Content-type": "multipart/form-data"
      }
    };
  
    try {
      const userResponse = await Axios.post('http://localhost:12280/user/add', {
        email: email,
        name: name,
        phone: phone,
        password: password,
        userType: "Student"
      });
  
      console.log(userResponse);
  
      if (userResponse.data === "Duplicate") {
        toast.error("User Already Exists");
        setTimeout(function () {
          window.location.reload();
        }, 5000);
      } else {
        const studentResponse = await Axios.post('http://localhost:12280/student/add', {
          name: name,
          UserEmail: email,
          phoneNum: phone,
          regNumber: registrationNumber,
          classRoll: classRoll,
          semester: semester,
          photo: fileDetails
        }, config);
  
        console.log(studentResponse.data);
        toast.success("Account Creation Successful \n Wait for Verification");
        setTimeout(function () {
          window.location.reload();
        }, 5000);
  
        const studentCourseResponse = await Axios.post('http://localhost:12280/studentCourse/student', {
          email: email
        });
  
        console.log(studentCourseResponse.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  



  return (
    <div className="page" style={{ backgroundImage: `url(${background1})` }} >


<MyNav/>
      <Container className="d-flex justify-content-center align-items-center" style={{ maxWidth: '400px', height: '80vh' }}>
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

              <Form.Group controlId="formBasicRegistrationNumber">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control type="number" placeholder="Enter registration number " value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicClassRoll">
                <Form.Label>Class Roll</Form.Label>
                <Form.Control type="number" placeholder="Enter class roll" value={classRoll} onChange={(e) => setClassRoll(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicSemester">
                <Form.Label>Semester</Form.Label>
                <Form.Control type="number" placeholder="Enter semester" value={semester} onChange={(e) => setSemester(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="photo" onChange={(event) => { onChangePicture(event) }} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="mx-auto" style={{ marginTop: '25px' , marginBottom:'50px'}}>
                Sign Up
              </Button>
            </div>
          )}
        </Form>

      </Container>


      
    </div>
  );
}

export default Student;