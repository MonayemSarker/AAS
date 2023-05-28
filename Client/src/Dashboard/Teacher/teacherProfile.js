import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MyNav from '../NavBar'

export function TeacherProfile() {

    const [showAlert, setShowAlert] = useState(false);

    function handleLogout() {
        setShowAlert(true);
    }

    ;

    function handleConfirmLogout(confirm) {
        setShowAlert(false);
        if (confirm) {
            // Perform logout logic here
            console.log("Logging out...");

            window.location.href = "/";
        }
    }


    const { email } = useParams();
    const [teacherInformation, setTeacherInformation] = useState({});
    useEffect(() => {
        Axios.get(`http://localhost:12280/teacher/${email}`).then((response) => {
            setTeacherInformation(response.data);
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
        authenticate("Teacher");
    }, []);

    return (
        <>
            {
                authState && (

                    <div className="page">
<MyNav/>
                        <section>

                            <div className="card mb-3 mx-auto" >
                                <div className="row no-gutters">
                                    
                                    <div className="col-md-13" >
                                        <div className="card-body">
                                            <p className="card-title"> <b><strong>Name:</strong></b> {teacherInformation.name}</p>
                                            <p className="card-text-"> <b><strong>Email:</strong></b>  {teacherInformation.UserEmail}</p>
                                            <p className="card-text"><b><strong>Phone:</strong></b> {teacherInformation.phoneNum}</p>
                                            <p className="card-text"><b><strong>Current Address:</strong></b> {teacherInformation.currentAddr}</p>
                                            {/* <p className="card-text"><b><strong>Department Name: </strong></b>{teacherInformation.deptName}</p> */}
                                            <p className="card-text"><b><strong>Gender:</strong></b> {teacherInformation.gender}</p>
                                            <p className="card-text"><b><strong>Id:</strong></b> {teacherInformation.id}</p>
                                            <p className="card-text"><b><strong>Permanent Address:</strong></b> {teacherInformation.permanentAddr}</p>

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

export default TeacherProfile;