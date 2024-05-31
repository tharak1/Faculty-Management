import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MarkAttendance from './screens/MarkAttendance';
import Substitute from './screens/Substitute';
import TimeTable from './screens/TimeTable';
import AdminManageFaculty from './screens/admin/AdminManageFaculty';
import AdminManageFacultyAttendance from './screens/admin/AdminManageFacultyAttendance';
import AdminAssignTimeTable from './screens/admin/AdminAssignTimeTable';
import SideBar from './screens/SideBar';
import LoginScreen from './screens/LoginScreen';
import DevOptions from './screens/admin/DevOptions';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginScreen />} />

        <Route path='/app' element={<SideBar/>}>
          <Route path='/app/home' element={<HomeScreen />} />
          <Route path='/app/mark_attendance' element={<MarkAttendance />} />
          <Route path='/app/substitute' element={<Substitute />} />
          <Route path='/app/timeTable' element={<TimeTable />} />

          <Route path='/app/admin'>
            <Route path='/app/admin/manage_faculty' element={<AdminManageFaculty />} />
            <Route path='/app/admin/manage_faculty_attendance' element={<AdminManageFacultyAttendance />} />
            <Route path='/app/admin/manage_TimeTable' element={<AdminAssignTimeTable />} />
            <Route path='/app/admin/dev' element={<DevOptions />} />

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
