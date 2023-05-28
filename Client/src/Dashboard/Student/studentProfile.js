import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './studentDashboard.css';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MyNav from '../NavBar';

export function StudentProfile() {


    const { email } = useParams();

    const [studentInformation, setStudentInformation] = useState({});
    // const [filename, setFileName] = useState("");
    useEffect(() => {
        Axios.get(`http://localhost:12280/student/${email}`).then((response) => {
            setStudentInformation(response.data);
            // setFileName(response.data.photo);
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
        authenticate("Student");
    }, []);

    return (
        <>
            {
                authState && (
                    <div className="page" style={{ backgroundImage: `url(${background1})` }} >
                        <MyNav />
                        <section>

                            <div className="card mb-3 mx-auto" >
                                <div className="row no-gutters">
                                    <div className="col-md-4" >
                                        <img src={`http://localhost:12280/studentImages/${studentInformation.photo}`}
                                            className="card-img"
                                            alt="student photo"
                                            style={{ height: "500px", width: "auto", paddingLeft: "200px" }}

                                        />
                                    </div>
                                    <div className="col-md-8 " >
                                        <div className="card-body">
                                            <p className="card-title"> <b><strong>Name:</strong></b> {studentInformation.name}</p>
                                            <p className="card-text-"> <b><strong>Email:</strong></b>  {studentInformation.UserEmail}</p>
                                            <p className="card-text"><b><strong>Phone:</strong></b> {studentInformation.phoneNum}</p>
                                            <p className="card-text"><b><strong>Registration Number: </strong></b>{studentInformation.regNumber}</p>
                                            <p className="card-text"><b><strong>Roll number:</strong></b> {studentInformation.classRoll}</p>
                                            <p className="card-text"><b><strong>Semester:</strong></b> {studentInformation.semester}</p>
                                            <p className="card-text"><b><strong>Current Address:</strong></b> {studentInformation.currentAddr}</p>
                                            {/* <p className="card-text"><b><strong>Department Name: </strong></b>{studentInformation.deptName}</p> */}
                                            <p className="card-text"><b><strong>Gender:</strong></b> {studentInformation.gender}</p>
                                            {/* <p className="card-text"><b><strong>Id:</strong></b> {studentInformation.id}</p> */}
                                            <p className="card-text"><b><strong>Permanent Address:</strong></b> {studentInformation.permanentAddr}</p>
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

export default StudentProfile;