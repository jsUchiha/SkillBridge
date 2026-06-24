import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CreateCourse from "./pages/CreateCourse";
import ViewCourse from "./pages/ViewCourse";
import EditCourse from "./pages/EditCourse";
import AssignTeacher from "./pages/AssignTeacher";
import AssignStudents from "./pages/AssignStudents";
import CreateTask from "./pages/CreateTask";
import TeacherMyCourse from "./pages/TeacherMyCourse";
import ViewStudents from "./pages/ViewStudents";
import ViewTasks from "./pages/ViewTasks";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import MyTasks from "./pages/MyTasks";
import StudentMyCourse from "./pages/StudentMyCourse";
import ViewSubmissions from "./pages/ViewSubmissions";
import EditTask from "./pages/EditTask";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import StudentAnnouncements from "./pages/StudentAnnouncements";
import ViewAnnouncements from "./pages/ViewAnnouncements";
import EditAnnouncement from "./pages/EditAnnouncement";
import CreateSession from "./pages/CreateSession";
import ViewSessions from "./pages/ViewSessions";
import StudentOnlineClasses from "./pages/StudentOnlineClasses";
import Home from "./pages/Home";
import EditSession from "./pages/EditSession";
import Attendance from "./pages/Attendance";
import TakeAttendance from "./pages/TakeAttendance";
import StudentAttendance from "./pages/StudentAttendance";
import CreateOrganization from "./pages/CreateOrganization";
import ManageMentors from "./pages/ManageMentors";
import CompleteProfile from "./pages/CompleteProfile";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/teacher" element={<TeacherDashboard/>} />
        <Route path="/admin/create-course" element={<CreateCourse />} />
        <Route path="/admin/view-course" element={<ViewCourse />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />} />
        <Route path="/admin/assign-teacher/:id" element={<AssignTeacher />} />
        <Route path="/admin/assign-students/:id" element={<AssignStudents/>}/>
        <Route path="/create-task" element={<CreateTask/>}/>
        <Route path="/teacher-my-course" element={<TeacherMyCourse/>}/>
        <Route path="/view-students" element={<ViewStudents/>}/>
        <Route path="/view-tasks" element={<ViewTasks/>}/>
        <Route path="/student" element={<StudentDashboard/>}/>
        <Route path="/my-tasks" element={<MyTasks/>}/>
        <Route path="/student-course" element={<StudentMyCourse/>}/>
        <Route path="/view-submissions" element={<ViewSubmissions/>}/>
        <Route path="/edit-task/:id" element={<EditTask/>}/>
        <Route path="/create-announcement" element={<CreateAnnouncement/>}/>
        <Route path="/announcements" element={<StudentAnnouncements/>}/>
        <Route path="/view-announcements" element={<ViewAnnouncements/>}/>
        <Route path="/edit-announcement/:id" element={<EditAnnouncement/>}/>
        <Route path="/create-session" element={<CreateSession/>}/>
        <Route path="/view-sessions" element={<ViewSessions/>}/>
        <Route path="/online-classes" element={<StudentOnlineClasses/>}/>
        <Route path="/edit-session/:id" element={<EditSession />}/>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/take-attendance" element={<TakeAttendance/>}/>
        <Route path="/student-attendance" element={<StudentAttendance/>}/>
        <Route path="/create-organization" element={<CreateOrganization/>}/>
        <Route path="/admin/mentors" element={<ManageMentors/>}/>
        <Route path="/complete-profile" element={<CompleteProfile />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;