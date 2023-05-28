import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import profile from '../../profile.jpg';
import manualAttendance from '../../manualAttendance.jpg';
import startAClass from '../../startAClass.jpg';
import report from '../../report.jpg';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './teacherDashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import MyNav from '../NavBar.js'

export function TeacherDashboard() {
    const { email } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [courseCode1, setCourseCode1] = useState('');
    const [barcode, setBarcode] = useState('');
    const [courseCodeEdit, setCourseCodeEdit] = useState('');
    const [regNumberEdit, setRegNumberEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    const [statusEdit, setStatusEdit] = useState('');
    const [showModal1, setShowModal1] = useState(false);
    const [showModalDigital, setShowModalDigital] = useState(false);
    const [showModalManual, setShowModalManual] = useState(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);


    const handleEditAttendance = (e) => {
        const editAttendanceInfo = {
            dateEdit,
            courseCodeEdit,
            regNumberEdit,
            statusEdit
        }

        axios.put(`http://localhost:12280/attendance/edit`, editAttendanceInfo).then(response => {
            toast.error(response);
        });
        //console.log("hoisseeeeeeeeeeeeee")
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUpdateDigitalAttendance();
            setBarcode('');
        }
    };

    const handleUpdateDigitalAttendance = () => {
        const attendanceInfo = {
            courseCode1,
            barcode,
            email
        }

        axios.put(`http://localhost:8000/attendance/scanner`, attendanceInfo).then(response => {
            toast.error(response.data.error);
        })
            .catch(error => {
                toast.error(error);
            });
    };

    const handleStart = (event) => {
        const courseInfo = {
            courseCode1
        }
        axios.post(`http://localhost:12280/attendance/start`, courseInfo)
            .then(response => {
                toast.success(`Starting class with course code ${courseCode1}`);
                setShowModal(false);
                setShowAttendanceModal(true);
            })
            .catch(error => {
                toast.error(error);
            });
    };
    const handleCloseModal = () => {
        setShowModalDigital(false);
        window.location.reload();
    };

    const handleDigitalAttendance = () => {
        setShowModalDigital(true);

    }
    const [attendanceInformation, setAttendanceInformation] = useState([]);
    const handleManualAttendance = () => {
        setShowModalManual(true);
        console.log(courseCode1);


        axios.get(`http://localhost:12280/attendance/getStudent?courseCode1=${courseCode1}`)
            .then((response) => {
                const students = response.data;
                console.log(students);
                setAttendanceInformation(students);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCloseModal1 = () => {
        setShowModalManual(false);
        window.location.reload();
    };


    const handleUpdateManualAttendance = async (index) => {

        const user = attendanceInformation[index];
        const regNumber = user.regNumber;
        const attendanceInfo = {
            courseCode1,
            regNumber
        }

        const response = await axios.put(`http://localhost:12280/attendance/manualCount`, attendanceInfo);

        if (response.status === 200) {
            const updatedAttendanceInformation = [...attendanceInformation];
            updatedAttendanceInformation.splice(index, 1);
            setAttendanceInformation(updatedAttendanceInformation);
            toast.success('Manually Attendance Taken');
        } else {
            throw new Error('Error updating Attendance status');
        }


    };


    const [adminUserType, setAdminUserType] = useState("");

    const [authState, setAuthState] = useState(false);
    const authenticate = (userType) => {
        axios.get("http://localhost:12280/auth/", {
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
        authenticate("Teacher");
    }, []);

    const [teacherInformation, setTeacherInformation] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:12280/teacher/${email}`).then((response) => {
            setTeacherInformation(response.data);
            console.log(response.data);
        });
    }, [])


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
                            <section class=" portfolio "  >
                                <Carousel>
                                    <Carousel.Item className="banner-carousel-item">
                                        <div class="container">


                                            <div class="row shuffle-wrapper portfolio-gallery">
                                                <div class="col-lg-7 col-8 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
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
                                                                        <h5 class="mb-0 ">Reports</h5>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 col-6 mb-4 shuffle-item" data-groups="[&quot;branding&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={startAClass}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" onClick={() => setShowModal(true)}>
                                                                        <h5 class="mb-0">Start A Class</h5>
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
                                                <div class="col-lg-12 col-6 mb-4 shuffle-item" data-groups="[&quot;design&quot;,&quot;illustration&quot;]">
                                                    <div class="position-relative inner-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div class="image position-relative " style={{ height: '250px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                            <img
                                                                src={manualAttendance}
                                                                class="img-fluid w-100 d-block"
                                                                alt="Logo"


                                                            />
                                                            <div class="overlay-box">
                                                                <div class="overlay-inner">
                                                                    <a class="overlay-content" onClick={() => setShowModal1(true)}>
                                                                        <h5 class="mb-0 ">Edit Attendance</h5>
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
                                <ToastContainer />
                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Start a Class</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="formCourseCode">
                                                <Form.Label>Course Code</Form.Label>
                                                <Form.Control type="text" placeholder="Enter course code" value={courseCode1} required onChange={(e) => setCourseCode1(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button variant="primary" onClick={() => handleStart()} >Start</Button>

                                    </Modal.Footer>
                                </Modal>
                                <Modal show={showAttendanceModal} onHide={() => setShowAttendanceModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Choose the way you want to select attendance</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="primary" onClick={handleManualAttendance} className="mx-2">
                                                Manual
                                            </Button>

                                            <Button variant="primary" onClick={handleDigitalAttendance} className="mx-2">
                                                Digital
                                            </Button>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                                <Modal show={showModalDigital} onHide={handleCloseModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Digital Attendance</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form >
                                            <Form.Group controlId="formFinishClass">
                                                <Form.Label>Registration Number</Form.Label>
                                                <Form.Control type="text" placeholder="Registration Number" value={barcode} required onChange={(e) => setBarcode(e.target.value)}
                                                    onKeyPress={handleEnterKeyPress} />
                                            </Form.Group>

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={showModalManual} onHide={handleCloseModal1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Take Manual Attendance</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ marginTop: '70px', height: '400px', overflowY: 'auto' }}>


                                        <table className="table table-bordered text-center" style={{ width: '80%', margin: "auto" }}>
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>Registration Number</th>
                                                    <th>Attendance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(attendanceInformation) &&
                                                    attendanceInformation.map((user, index) => (

                                                        <tr key={index}>
                                                            <td>{user.regNumber}</td>
                                                            <td>
                                                                <button className="btn btn-success" onClick={() => handleUpdateManualAttendance(index)}>
                                                                    <i className="fas fa-check"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))

                                                }
                                            </tbody>
                                        </table>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseModal1}>Cancel</Button>

                                    </Modal.Footer>
                                </Modal>

                                <Modal show={showModal1} onHide={() => setShowModal1(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Attendance</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="formCourseCodeEdit">
                                                <Form.Label>Course Code</Form.Label>
                                                <Form.Control type="text" placeholder="Enter course code" value={courseCodeEdit} required onChange={(e) => setCourseCodeEdit(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group controlId="formDateEdit">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control type="date" placeholder="Enter Date" value={dateEdit} required onChange={(e) => setDateEdit(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group controlId="formRegEdit">
                                                <Form.Label>Registration Number</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Registration Number" value={regNumberEdit} required onChange={(e) => setRegNumberEdit(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group controlId="formRegEdit">
                                                <Form.Label>Attendance</Form.Label>
                                                <Form.Control type="number" placeholder="Enter 1 to take attendance" value={statusEdit} required onChange={(e) => setStatusEdit(e.target.value)} />
                                            </Form.Group>

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal1(false)}>Cancel</Button>
                                        <Button variant="primary" onClick={handleEditAttendance} disabled={!courseCodeEdit} >Done</Button>
                                    </Modal.Footer>
                                </Modal>


                            </section>
                        </div>


                    </div>
                )
            }

        </>

    );
}

export default TeacherDashboard;