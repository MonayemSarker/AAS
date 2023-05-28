import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyNav from '../NavBar';

export function TeacherReport() {
  const [reportInformation, setReportInformation] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:12280/report/${email}/teacher`).then((response) => {
      setReportInformation(response.data);
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
    authenticate("Teacher");
  }, []);

  return (
    <>
      {
        authState && (
          <div className="page" >
            <MyNav />
            <section>
              <section style={{ marginTop: '70px', height: '300px', overflowY: 'auto' }}>
                {/* <table className="table table-bordered text-center" style={{ width: '80%', margin: "auto" }}>
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Report</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportInformation.map((info) => (
                      <tr key={info.id}>
                       <td>{info.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
                <table className="table table-bordered text-center" style={{ width: '80%', margin: 'auto' }}>
    <thead className="bg-primary text-white">
      <tr>
     
        <th>Course Code</th>
        <th>Registration Number</th>
        <th>Percentage</th>
      </tr>
    </thead>
    <tbody>
      {reportInformation.map((array, index) => (
        <React.Fragment key={index}>
          {array.map((item) => (
            <tr key={item.id}>
           
              <td>{item.courseCode}</td>
              <td>{item.regNumber}</td>
              <td>{item.percentage}%</td>
            </tr>
          ))}
        </React.Fragment>
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


} export default TeacherReport;