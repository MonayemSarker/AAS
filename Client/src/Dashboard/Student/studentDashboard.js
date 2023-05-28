import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import notice from '../../notice.jpg';
import report from '../../report.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './studentDashboard.css';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MyNav from '../NavBar';

export function StudentDashboard() {
    

    const { email } = useParams();
    const [studentInformation, setStudentInformation] = useState({});
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


                      <MyNav/>
                        <div class="profileclass"> <h5> Profile </h5>
                            <section>
                                <div class="row shuffle-wrapper portfolio-gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div class="col-lg-4 col-6 mb-0 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                        <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                <img
                                                    //  src={profile}
                                                    src={`http://localhost:12280/studentImages/${studentInformation.photo}`}
                                                    class="img-fluid w-100 d-block"
                                                    alt="Logo"
                                                />
                                                <div class="overlay-box">
                                                    <div class="overlay-inner">
                                                        <Link class="overlay-content" to={`/Student/${email}/profile`}>
                                                            <h5 class="mb-0 ">View Profile</h5>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="roleclass"> <h5> Roles </h5>

                            <section class=" portfolio "  >
                                
                                        <div class="container">


                                            <div class="row shuffle-wrapper portfolio-gallery">
                                                <div class="col-lg-7 col-6 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={notice}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <Link class="overlay-content" to={`/Student/${email}/receiveNotice`}>
                                                                        <h5 class="mb-0 ">Notice Management</h5>
                                                                        <p>Receive Notice</p>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;branding&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={report}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" href="portfolio-single.html">
                                                                        <h5 class="mb-0">Reports</h5>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    

                            </section>
                        </div>
                       
                    </div>
                )
            }
        </>
    );
}

export default StudentDashboard;