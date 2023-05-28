import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import profile from '../../profile.jpg';
import notice from '../../notice.jpg';
import AppApp from '../../ApplicationApproval.png';
import report from '../../report.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './directorDashboard.css';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import MyNav from '../NavBar'
export function DirectorDashboard() {
    const [showModal, setShowModal] = useState(false);

    const [directorInformation, setDirectorInformation] = useState({});
    const [applicationInformation, setApplicationInformation] = useState({});
    useEffect(() => {
        Axios.get(`http://localhost:12280/director/${email}`).then((response) => {
            setDirectorInformation(response.data);
            // console.log(response.data);
        });
        Axios.get(`http://localhost:12280/approval/${email}/get`).then((response) => {
            setApplicationInformation(response.data);
            // console.log(response.data);
        });
    }, [])

    const [attendanceInformation, setAttendanceInformation] = useState([]);
    const handleApproval = async (index) => {
        const application = applicationInformation[index];
        const regNumber = application.regNumber;
        console.log(application);
        const response = await Axios.put('http://localhost:12280/approval/approve', { regNumber });
        if (response.status === 200) {
            Axios.get(`http://localhost:12280/approval/${email}/get`).then((response) => {
                setApplicationInformation(response.data);
                // console.log(response.data);
            });
        }
        toast.success(`Approved`);
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
                    <div className="page" style={{ backgroundImage: `url(${background1})` }} >


                        <MyNav />

                        <div class="profileclass"> <h5> Profile </h5>
                            <section>
                                <div class="row shuffle-wrapper portfolio-gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div class="col-lg-4 col-6 mb-0 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                        <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                <img
                                                    //  src={profile}
                                                    src={profile}
                                                    class="img-fluid w-100 d-block"
                                                    alt="Logo"
                                                />
                                                <div class="overlay-box">
                                                    <div class="overlay-inner">
                                                        <Link class="overlay-content" to={`/Director/${email}/profile`}>
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
                            <ToastContainer />
                            <section class=" portfolio "  >
                                <Carousel>
                                    <Carousel.Item className="banner-carousel-item">
                                        <div class="container">


                                            <div class="row shuffle-wrapper portfolio-gallery">


                                                <div class="col-lg-7 col-6 mb-4 shuffle-item" data-groups="[&quot;branding&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={notice}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <div class="overlay-inner">
                                                                        <Link class="overlay-content" to={`/Director/${email}/noticeManagement`}>
                                                                            <h5 class="mb-0 ">Notice Management</h5>
                                                                        </Link>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">

                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={AppApp}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">

                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" onClick={() => setShowModal(true)}>
                                                                        <h5 class="mb-0 ">Application Approval</h5>
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


                                                <div class="col-lg-12 col-6 mb-4 shuffle-item" data-groups="[&quot;branding&quot;]">
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
                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Application Approval</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body style={{ marginTop: '70px', height: '400px', overflowY: 'auto' }}>
                                        <table className="table table-bordered text-center" style={{ width: '80%', margin: "auto" }}>
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>Registration Number</th>
                                                    <th>Approve</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(applicationInformation) &&
                                                    applicationInformation.map((user, index) => {
                                                        if (!user.approveStatus) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{user.regNumber}</td>
                                                                    <td>
                                                                        <button className="btn btn-success" onClick={() => handleApproval(index)}>
                                                                            <i className="fas fa-check"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        } else {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{user.regNumber}</td>
                                                                    <td>
                                                                        <button className="btn btn-primary">
                                                                            Approved
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    })}
                                            </tbody>
                                        </table>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>


                                    </Modal.Footer>
                                </Modal>
                            </section>
                        </div>
                        <section class="footer">
                            <div class="container">
                                <div class="row ">
                                    <div class="col-lg-6">
                                        <p class="mb-0">Copyrights © 1222 | 1228 </p>
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

export default DirectorDashboard;