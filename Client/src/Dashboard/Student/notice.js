import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../logo.jpg';
import background1 from '../../background1.jpg';
import profile from '../../profile.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './studentDashboard.css';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyNav from '../NavBar';

export function StudentNotice() {
  const [noticeInformation, setNoticeInformation] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:12280/notice/${email}/get`).then((response) => {
      setNoticeInformation(response.data);
    });
  }, [])



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
    authenticate("Student");
  }, []);
    return (
        <>
            {
                authState && ( 
                    <div className="page" style={{ backgroundImage: `url(${background1})` }} >
                       <MyNav/>
                        <section>
                        <section style={{ marginTop: '70px', height: '300px', overflowY: 'auto' }}>
              <table className="table table-bordered text-center" style={{ width: '80%', margin: "auto" }}>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Notice</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeInformation.map((info) => (
                    <tr key={info.id}>
                      <td>{info.notice}</td>
                      <td>{info.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>  
                        </section>
                       
                        </div> 
                    
                 )
            }
        </>
    );


} export default StudentNotice;