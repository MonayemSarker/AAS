import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyNav from './NavBar';

export function Notification() {
  const { email } = useParams();
  const [notificationInformation, setNotificationInformation] = useState({});
  useEffect(() => {
      Axios.get(`http://localhost:12280/notification/${email}`).then((response) => {
          setNotificationInformation(response.data);
          console.log(response.data);
      });
  }, [])

 const handleRemoveNotification=async(index)=>{
  try {
    const notification = notificationInformation[index];
    const id = notification.id;
    console.log(notification);
    const response = await Axios.delete('http://localhost:12280/notification/approve', { data: { id } })

    if (response.status === 200) {
        const updatedNotificationInformation = [...notificationInformation];
        updatedNotificationInformation.splice(index, 1);
        setNotificationInformation(updatedNotificationInformation);
    } else {
        throw new Error('Error');
    }
} catch (error) {
    toast.error('Error:', error);
}

 }
  const [authState, setAuthState] = useState(false);
  const authenticate = (email) => {
    Axios.get("http://localhost:12280/auth/", {
      headers: {
        accessToken: localStorage.getItem("accessToken")

      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        if (response.data.email == email) {
          setAuthState(true);
        }
      }
    });
  }

  useEffect(() => {
    authenticate(email);
  }, []);
  return (
    <>
      {
        authState && (
          <div className="page" style={{ backgroundImage: `url(${background1})` }} >
            <MyNav />
            <div style={{ marginTop:'70px' ,height: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered text-center" style={{ width: '80%', margin: "auto" }}>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Notification</th>
                    <th>Date</th>
                    <th>  Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(notificationInformation) &&
                    notificationInformation.map((user, index) => (

                      <tr key={index}>
                        <td>{user.type}</td>
                        <td>{user.createdAt}</td>
                        <td>
                        <button className="btn btn-success" onClick={() => handleRemoveNotification(index)}>
                            <i className="fas fa-check"></i>
                          </button>
                        </td>
                        
                      </tr>
                    ))

                  }
                </tbody>
              </table>
            </div>
          </div>

        )
      }
    </>
  );


} export default Notification;