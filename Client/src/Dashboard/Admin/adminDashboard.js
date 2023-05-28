import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import profile from '../../profile.jpg';
import notice from '../../notice.jpg';
import userManage from '../../userManage.jpg';
import report from '../../report.jpg';
import courseManagement from '../../courseManagement.jpg';
import deleteRecording from '../../deleteRecording.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './adminDashboard.css';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MyNav from '../NavBar'


export function AdminDashboard() {
  
  ;
  const [adminInformation, setAdminInformation] = useState({});
  useEffect(() => {
    Axios.get(`http://localhost:12280/admin/${email}`).then((response) => {
      setAdminInformation(response.data);
      console.log(response.data);
    });
  }, [])
  const [studentInformation, setStudentInformation] = useState({});
  useEffect(() => {
    Axios.get(`http://localhost:12280/student/all`).then((response) => {
      setStudentInformation(response.data);
   //   console.log(response.data);
    });
  }, [])

  // const handleGetNotification = () => {
  //   const regNum = Object.values(studentInformation).map(student => student.regNumber);
  //   console.log(regNum);
  //   regNum.forEach((regNumber) => {
  //     console.log(regNumber);
  //     Axios.post(`http://localhost:12280/notification/post`, {regNumber} )
  //       .then(response => {
  //         console.log("hi");        
  //       })
  //       .catch(error => {
  //         console.error("An error occurred:", error);
  //       });
  //   });
  // };
  
  const [adminUserType, setAdminUserType] = useState("");
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
          setAdminUserType(response.data.userType);
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
          <div className="page" style={{ backgroundImage: `url(${background1})` }} >
            <MyNav /> 
            {/* <Button variant="secondary" onClick={() => handleGetNotification()} >Cancel</Button> */}
            <div class="profileclass"> <h5> Profile </h5>
              <section>
                <div class="row shuffle-wrapper portfolio-gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div class="col-lg-4 col-6 mb-0 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <img
                          src={profile}

                          class="img-fluid w-100 d-block"
                          alt="Logo"
                        />
                        <div class="overlay-box">
                          <div class="overlay-inner">
                            <Link class="overlay-content" to={`/${adminUserType}/${email}/profile`}>
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
              <section></section>
              <section class=" portfolio "  >
                <Carousel>
                  <Carousel.Item className="banner-carousel-item">
                    <div class="container">


                      <div class="row shuffle-wrapper portfolio-gallery">
                        <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                          <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                              <img
                                src={userManage}
                                class="img-fluid w-100 d-block"
                                alt="Logo"


                              />
                              <div class="overlay-box">
                                <div class="overlay-inner">
                                  <Link class="overlay-content" to={`/${adminUserType}/${email}/manageUser`}>
                                    <h5 class="mb-0 ">Manage Users</h5>
                                    <p>Verify, Add and Delete Users</p>
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
                                src={courseManagement}
                                class="img-fluid w-100 d-block"
                                alt="Logo"


                              />
                              <div class="overlay-box">
                                <div class="overlay-inner">
                                  <Link class="overlay-content" to={`/${adminUserType}/${email}/manageCourse`}>
                                    <h5 class="mb-0">Course Management</h5>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;illustration&quot;]">
                          <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                              <img
                                src={deleteRecording}
                                class="img-fluid w-100 d-block"
                                alt="Logo"


                              />
                              <div class="overlay-box">
                                <div class="overlay-inner">
                                  <a class="overlay-content" href="portfolio-single.html">
                                    <h5 class="mb-0">Delete Recordings </h5>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                       

                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
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
                                  <Link class="overlay-content" to={`/${adminUserType}/${email}/manageNotice`}>
                                    <h5 class="mb-0 ">Notice Management</h5>
                                    <p>Send and Receive Notice</p>
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
                  </Carousel.Item>
                 
                </Carousel>

              </section>
            </div>

          </div>
        )
      }
    </>
  );
}
export default AdminDashboard;