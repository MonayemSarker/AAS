import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Modal, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import './adminDashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import { useParams} from 'react-router-dom';
import MyNav from '../NavBar1';

export function ManageUser() {

    const [email, setEmail] = useState('');
    const [emailRemoved, setEmailRemoved] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        setPhoneNum(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setUserEmail(value);
    };

    const [userInformation, setUserInformation] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:12280/user/all`).then((response) => {

            setUserInformation(response.data);

        });
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);


    function handleSubmitAdd(event) {
        event.preventDefault();
        setShowModal1(true);
    }

    const handleConfirmAdd = (event) => {
        event.preventDefault();

        const newUser = {
            email,
            phone,
            password,
            userType,
            verificationStatus
        };
        Axios.post('http://localhost:12280/user/add', newUser)
            .then((response) => {
                const data = response.data;
                if (data === 'Duplicate') {
                    toast.error('User already exists');
                } else {
                    if (userType.match("Teacher")) {
                        const newTeacher = {
                            name,
                            UserEmail,
                            phoneNum,
                            password,
                        };
                        Axios.post('http://localhost:12280/teacher/add', newTeacher)
                            .then((response) => {
                                const data = response.data;
                            })
                    }
                    else if (userType.match("Director")) {
                        const newDirector = {
                            name,
                            UserEmail,
                            phoneNum,
                            password,
                        };
                        Axios.post('http://localhost:12280/director/add', newDirector)
                            .then((response) => {
                                const data = response.data;
                            })
                    }
                
                toast.success(`User with email ${email} has been added.`);
            }
            })
            .catch ((error) => {
        toast.error('An error occurred');
    });
    setTimeout(function () {
        window.location.reload();
      }, 5000);


};


function handleSubmitDelete(event) {
    event.preventDefault();
    if (emailRemoved.trim() !== '') {
        setShowModal4(true);

    }
}
const handleRemoveUser = (event) => {
    event.preventDefault();
    Axios.delete('http://localhost:12280/user/delete', { data: { emailRemoved } })
        .then((response) => {
            const data = response.data;
            toast.success(`User with email ${emailRemoved} has been removed.`);
            setShowModal4(false);
        })
        .catch((error) => {
            toast.error('An error occurred');
        });
        setTimeout(function () {
            window.location.reload();
          }, 5000);
};



const handleVerifyClick = async (index) => {
    try {
        const user = userInformation[index];
        const email = user.email;
        console.log(user);

        const response = await Axios.put(`http://localhost:12280/user/${email}/verifyUser`, {
            verificationStatus: true
        });

        if (response.status === 200) {
            const updatedUserInformation = [...userInformation];
            updatedUserInformation.splice(index, 1);
            setUserInformation(updatedUserInformation);
            toast.success('Verification status updated');
        } else {
            throw new Error('Error updating verification status');
        }
    } catch (error) {
        toast.error('Error:', error);
    }
};


const { email1 } = useParams();
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
        if (response.data.userType == userType && response.data.email == email1) {
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
                <div className="page" style={{ backgroundImage: `url(${background1})` }} >
                    <MyNav/>

                    <ToastContainer />
                    <section>
                        <h3 style={{ marginLeft: "47%", paddingTop: "50px", marginBottom: "30px" }}>Verify User</h3>
                        <div style={{ marginTop:'70px' ,height: '200px', overflowY: 'auto' }}>
                        <table className="table table-bordered text-center" style={{ width: '80%', margin: "auto" }}>
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>User Type</th>
                                    <th>Verify</th>


                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(userInformation) &&
                                    userInformation.map((user, index) => {
                                        if (!user.verificationStatus) {
                                            return (
                                                <tr key={index}>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.userType}</td>
                                                    <td>
                                                        <button className="btn btn-success" onClick={() => handleVerifyClick(index)}>
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                            </tbody>
                        </table>
                        </div>
                    </section>

                    <section>

                        <h3 style={{ marginLeft: "47.5%", paddingTop: "50px" }}>Add User</h3>
                        <ToastContainer />

                        <Button variant="primary" onClick={handleSubmitAdd} type="submit" style={{ marginTop: '2rem', width: '200px', marginLeft: '46%', height: '60px' }}>
                            Add
                        </Button>

                        <Modal show={showModal1} onHide={() => setShowModal1(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add a new User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ToastContainer />
                                <Form onSubmit={handleConfirmAdd}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={handlePhoneChange} required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={userType}
                                        onChange={(event) => setUserType(event.target.value)}
                                    >
                                        <option value="">Choose User Type</option>
                                        <option value="Teacher">Teacher</option>
                                        <option value="Director">Director</option>
                                    </Form.Control>
                                </Form.Group>

                                    <Form.Group controlId="form VerificationStatus">
                                        <Form.Label>Verification Status</Form.Label>
                                        <Form.Control type="boolean" placeholder="Enter Verification Status" value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)} required />
                                    </Form.Group>
                                    <Modal.Footer>

                                        <Button variant="secondary" onClick={() => setShowModal1(false)} >
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Confirm
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>

                        </Modal>
                    </section>









                    <section>
                        <h3 style={{ marginLeft: "47%", paddingTop: "50px" }}>Remove User</h3>
                        <ToastContainer />
                        <Form onSubmit={handleSubmitDelete} style={{ width: "80%", margin: "auto" }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={emailRemoved}
                                    required
                                    onChange={(event) => setEmailRemoved(event.target.value)}
                                />
                            </Form.Group >
                            <Button variant="danger" type="submit" style={{ marginTop: "2rem", width: "200px", marginLeft: "45%", height: "60px", marginBottom: "150px" }}>
                                Remove
                            </Button>

                            <Modal show={showModal4} onHide={() => setShowModal4(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure you want to remove the user?</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <p>Click "Yes" to remove the user or "No" to cancel.</p>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal4(false)}>
                                        No
                                    </Button>
                                    <Button variant="primary" onClick={handleRemoveUser}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Form>
                    </section>
                  
                </div>
            )
        }
    </>
);
}

export default ManageUser;