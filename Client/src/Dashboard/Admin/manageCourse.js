import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../../background1.jpg';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { useState } from 'react';
import Axios from 'axios';
import { useParams} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyNav from '../NavBar'

export function ManageCourse() {
 
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [semester, setSemester] = useState('');
  const [courseCode1, setCourseCode1] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');

  const handleAddCourse = (event) => {
    event.preventDefault();
    if (courseName.trim() === '' || courseCode.trim() === '' ||semester.trim() === '') {
      toast.error('Please give informations properly');
      return;
    }
    const newCourse = {
      courseName,
      courseCode,
      semester
    };
    Axios.post('http://localhost:12280/course/add', newCourse)
      .then((response) => {
        const data = response.data;
        toast.success("Course Added");
        const newCourseStudent = {
          courseCode,
          semester
        };
        Axios.post('http://localhost:12280/studentCourse/course', newCourseStudent)
          .then((response) => {
          }).catch((error) => {
            toast.error('Error occurred');
          })


      }).catch((error) => {
        toast.error('An error occurred');
      })
      setTimeout(function () {
        window.location.reload();
      }, 6000);

  }
  const handleAddTeacherToCourse = (event) => {
    event.preventDefault();

    const newCourseTeacher = {
      courseCode1,
      teacherEmail
    };
    Axios.post('http://localhost:12280/teacherCourse/add', newCourseTeacher)
      .then((response) => {
        if (response.data.error === 'Teacher or Course invalid') {
          toast.error(response.data.error);
        }
        else{toast.success("Teacher added");}
        
      }).catch((error) => {
        toast.error('Error occurred');
      })


  }

  const [teacherInformation, setTeacherInformation] = useState([]);
  const [courseInformation, setCourseInformation] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:12280/teacher/all`).then((response) => {

      setTeacherInformation(response.data);

    });
  }, []);
  useEffect(() => {
    Axios.get(`http://localhost:12280/course/all`).then((response) => {

      setCourseInformation(response.data);

    });
  }, []);

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
    authenticate("Admin");
  }, []);


  return (
    <>
      {
        authState && (
          <div className="page" >
            <MyNav/>

            
            <section >
              <h3 style={{ marginLeft: "47%", paddingTop: "50px" }}>Add Course</h3>
              <ToastContainer />
              <Form className="Course-form" style={{ width: "80%", margin: "auto" }}>
                <Form.Group controlId="formCourseName">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formCourseCode">
                  <Form.Label>Course code</Form.Label>
                  <Form.Control type="integer" placeholder="Enter Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formSemester">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control type="integer" placeholder="Enter Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
                </Form.Group>


                <Button variant="primary" type="submit" className="course-add-button"

                  style={{ marginTop: "2rem", width: "200px", marginLeft: "45%", height: "60px", marginBottom: "20px" }}
                  onClick={(e) => { handleAddCourse(e) }}>
                  Add Course
                </Button>
              </Form>

            </section>
            <section>
              <h3 style={{ marginLeft: "47%", paddingTop: "50px" }}>Assign Teacher</h3>

              <Form style={{ width: "80%", margin: "auto" }}>
                <Form.Group controlId="formTeacherCode">
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    as="select"
                    value={teacherEmail}
                    onChange={(event) => setTeacherEmail(event.target.value)}
                  >
                    <option value="">Choose Teacher</option>
                    {teacherInformation.map((teacher) => (
                      <option key={teacher.id} value={teacher.UserEmail}>
                        {teacher.UserEmail}
                      </option>
                    ))}

                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCourseCode1">
                  <Form.Label>Course Code</Form.Label>
                  <Form.Control
                    as="select"
                    value={courseCode1}
                    onChange={(event) => setCourseCode1(event.target.value)}
                  >
                    <option value="">Choose Course</option>
                    {courseInformation.map((courses) => (
                      <option key={courses.id} value={courses.courseCode}>
                        {courses.courseCode}
                      </option>
                    ))}

                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="courseTeacher-add-button"
                  style={{ marginTop: "2rem", width: "200px", marginLeft: "45%", height: "60px", marginBottom: "150px" }}
                  onClick={(e) => { handleAddTeacherToCourse(e) }}>
                  Add
                </Button>
              </Form>
            </section>

          
          </div>
        )
      }
    </>
  );
}

export default ManageCourse;