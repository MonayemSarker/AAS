import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyNav from '../NavBar';

export function AdminNoticeManagement() {
  const [notice, setNotice] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const { email } = useParams();
  const [noticeInformation, setNoticeInformation] = useState([]);
  const [studentInformation, setStudentInformation] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:12280/notice/${email}/get`).then((response) => {
      setNoticeInformation(response.data);
    });
    Axios.get(`http://localhost:12280/approval/${email}/get`).then((response) => {
      setStudentInformation(response.data);
      console.log(response.data);
    });
  }, [])
  const handleSendNotice = (event) => {
    event.preventDefault();
    if (notice.trim() === '') {
      toast.error('Please wite the notice');
      return;
    }
    const newNotice = {
      regNumber,
      notice
    };
    Axios.post('http://localhost:12280/notice/admin', newNotice)
      .then((response) => {
        if (regNumber.trim() === '') {
          toast.error('Student not found');
          return;
        }
        toast.success(`Notice Sent to student having registraion number ${regNumber}`);
      }).catch((error) => {
        toast.error('Error occurred');
      })


  }
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
  const copyText = (notice) => {
    setNotice(notice);
  };
  useEffect(() => {
    authenticate("Admin");
  }, []);
  return (
    <>
      {
        authState && (
          <div className="page" >
            <MyNav />
            <section style={{ marginTop: '70px', height: '200px', overflowY: 'auto' }}>
              <table className="table table-bordered text-center" style={{ width: '80%', margin: "auto" }}>
                <thead className="bg-primary text-white">
                  <tr >
                    <th >Notice</th>
                    <th>Date</th>
                    <th>Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeInformation.map((info) => (
                    <tr key={info.id}>
                      <td >{info.notice}</td>
                      <td>{info.createdAt}</td>
                      <td>
                        <button className="btn btn-success"
                         onClick={() => copyText(info.notice)}
                        >
                          <i className="fas fa-check"></i>

                          Copy Notice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <ToastContainer />
            <section>
              {<Form style={{ width: "80%", margin: "auto" }}>

                <Form.Group controlId="formNotice">
                  <Form.Label>Notice</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter the notice"
                    value={notice}
                    onChange={(event) => setNotice(event.target.value)} required
                    style={{ height: "100px" }}
                  />
                </Form.Group>
                <Form.Group controlId="formStudent">
                  <Form.Label>Registration Number </Form.Label>
                  <Form.Control
                    as="select"
                    value={regNumber}
                    onChange={(event) => setRegNumber(event.target.value)}
                  >
                    <option value="">Choose Student</option>
                    {studentInformation.map((student) => (
                      <option key={student.id} value={student.regNumber}>
                        {student.regNumber}
                      </option>
                    ))}

                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="notice=button"
                  style={{ marginTop: "2rem", width: "200px", marginLeft: "45%", height: "60px", marginBottom: "150px" }}
                  onClick={(e) => { handleSendNotice(e) }}
                >
                  Send
                </Button>

              </Form>}
            </section>

          </div>

        )
      }
    </>
  );


} export default AdminNoticeManagement;