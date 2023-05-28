import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Welcome/Welcome';
import Teacher from './signup/Teacher';
import Director from './signup/Director';
import Student from './signup/Student';
import LogIn from './login/LogIn';
import AdminDashboard from './Dashboard/Admin/adminDashboard';
import AdminProfile from './Dashboard/Admin/adminProfile';
import Notification from "./Dashboard/notification";
import DirectorDashboard from './Dashboard/Director/directorDashboard';
import TeacherDashboard from './Dashboard/Teacher/teacherDashboard';
import StudentDashboard from './Dashboard/Student/studentDashboard';
import ResetPassword from './Dashboard/ResetPassword';
import AdminNoticeManagement from './Dashboard/Admin/manageNotice';
import AdminEditInfo from './Dashboard/Admin/adminEditInfo';
import DirectorEditInfo from './Dashboard/Director/directorEditInfo';
import DirectorProfile from './Dashboard/Director/directorProfile';
import TeacherEditInfo from './Dashboard/Teacher/teacherEditInfo';
import TeacherProfile from './Dashboard/Teacher/teacherProfile';
import StudentEditInfo from './Dashboard/Student/studentEditInfo';
import StudentProfile from './Dashboard/Student/studentProfile';
import StudentNotice from "./Dashboard/Student/notice";
import ManageCourse from "./Dashboard/Admin/manageCourse";
import ManageUser from "./Dashboard/Admin/manageUser";
import ManageNotice from './Dashboard/Director/noticeManagement';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/director" element={<Director />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />

          <Route path="/Admin/:email" element={<AdminDashboard />} />
          <Route path="/Admin/:email/profile" element={<AdminProfile />} />
          <Route path="/Admin/:email1/EditInfo" element={<AdminEditInfo />} />
          <Route path="/Admin/:email1/manageUser" element={<ManageUser />} />
          <Route path="/Admin/:email/manageCourse" element={<ManageCourse />} />
          <Route path="/Admin/:email/manageNotice" element={<AdminNoticeManagement />} />

          <Route path="/Teacher/:email" element={< TeacherDashboard />} />
          <Route path="/Teacher/:email/profile" element={<TeacherProfile />} />
          <Route path="/Teacher/:email1/EditInfo" element={<TeacherEditInfo />} />

          <Route path="/Director/:email" element={< DirectorDashboard />} />
          <Route path="/Director/:email/profile" element={<DirectorProfile />} />
          <Route path="/Director/:email1/EditInfo" element={<DirectorEditInfo />} />
          <Route path="/Director/:email/noticeManagement" element={<ManageNotice />} />

          <Route path="/Student/:email" element={< StudentDashboard />} />
          <Route path="/Student/:email/profile" element={<StudentProfile />} />
          <Route path="/Student/:email1/EditInfo" element={<StudentEditInfo />} />
          <Route path="/Student/:email/receiveNotice" element={<StudentNotice />} />

          <Route path="/:email/notification" element={<Notification />} />
          <Route path="/:email/ResetPassword" element={<ResetPassword />} />
        </Routes>

      </BrowserRouter>
      <section class="footer" style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <div >
          
            <div class="col-lg-6">
              <p >Copyrights © 1222 | 1228 </p>
            </div>
          </div>
        
      </section>
    </div>
  );
}

export default App;