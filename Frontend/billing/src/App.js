import './App.css';
import LoginSignup from './Components/LoginSignup';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayData from './Components/DisplayData';
import UserPortal from './Components/UserPortal';
import UpdateData from './Components/UpdateData';
import AddData from './Components/AddData';
import Notfound from './Components/Notfound';

function App() {
  return (
    <Router>
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginSignup pageTitle="Billing-Login/SignUp" />} />
        <Route path="/Admin-Portal" element={<DisplayData pageTitle="Admin Portal" />} />
        <Route path="/User-Portal" element={<UserPortal pageTitle="User Portal" />} />
        <Route path="/Admin/UpdateData" element={<UpdateData pageTitle="Admin-Update" />} />
        <Route path="/Admin/AddData" element={<AddData pageTitle="Admin-ADD" />} />
        <Route path="*" element={<Notfound pageTitle="404 - Not Found" />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
