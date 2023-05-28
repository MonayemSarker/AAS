import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import MyNav from '../NavBar'


export function AdminProfile() {
  
    const { email } = useParams();

    const [adminInformation, setAdminInformation] = useState({});
    useEffect(() => {
        Axios.get(`http://localhost:12280/admin/${email}`).then((response) => {
            setAdminInformation(response.data);
            console.log(response.data);
        });
    }, [])

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
      authenticate("Admin");
    }, []);

    return (
        <>
            {
                authState && (
                    <div className="page">
                            <MyNav /> 

                        <section>

                            <div className="card mb-3 mx-auto" >
                                <div className="row no-gutters">
                                    
                                    <div className="col-md-13 " >
                                        <div className="card-body">
                                            <p className="card-title"> <b><strong>Name:</strong></b> {adminInformation.name}</p>
                                            <p className="card-text-"> <b><strong>Email:</strong></b>  {adminInformation.UserEmail}</p>
                                            <p className="card-text"><b><strong>Phone:</strong></b> {adminInformation.phoneNum}</p>
                                            <p className="card-text"><b><strong>Current Address:</strong></b> {adminInformation.currentAddr}</p>
                                            <p className="card-text"><b><strong>Gender:</strong></b> {adminInformation.gender}</p>
                                            <p className="card-text"><b><strong>Permanent Address:</strong></b> {adminInformation.permanentAddr}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                      
                    </div>
                )
            }
        </>
    );
}

export default AdminProfile;