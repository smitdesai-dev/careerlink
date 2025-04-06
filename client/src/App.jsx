// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import Register from "./pages/Registerpage";
// import Login from "./pages/Loginpage";
// import Home from "./pages/Homepage";
// import Company_Register from "./pages/Company_Registerpage";
// import Company_Login from "./pages/Company_Loginpage";
// import Company_Dashboard from "./pages/company_Dashboard";
// import Postjob from "./pages/postjob";
// import AdminSignup from "./Admin/Admin_Signup";
// import AdminDashboard from "./Admin/AdminDashboard";
// import Otpverification from "./pages/otp";
// import Application from "./pages/application";
// import CompanyOtp from "./pages/company_otp";
// import Profile from "./pages/profile";
// import Newsfeed from "./pages/newsfeed";
// import WelcomePage from "./pages/WelcomePage";
// import Courses from "./pages/courses";
// import Aboutus from "./pages/aboutus";
// import Contactus from "./pages/contactus";
// import ReceivedApplication from "./pages/received_Applications";
// import Admin_analysis from "./Admin/Admin_analysis";
// import Approved_jobs from "./Admin/Approved_jobs";
// import Rejected_jobs from "./Admin/Rejected_jobs";
// import Error from "./pages/errorpage";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Chatbot from "./components/chatbox";
// import "../src/App.css";
// import Company_Profile from "./pages/company_profile";
// import JobDetailsPage from "./pages/JobDetailsPage";

// // Separate Component that can use useNavigate
// function ChatbotIcon() {
//   const navigate = useNavigate();

//   const handleChatbot = () => {
//     navigate("/chatbot");
//   };

//   return (
//     <div id="chatbot-icon">
//       <img
//         src="chatbot.webp"
//         alt="Chatbot"
//         id="chatbot-img"
//         onClick={handleChatbot}
//       />
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<WelcomePage />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/otp_verification" element={<Otpverification />} />
//         <Route path="/company_register" element={<Company_Register />} />
//         <Route path="/company_login" element={<Company_Login />} />
//         <Route path="/company_otp_verification" element={<CompanyOtp />} />
//         <Route path="/company_dashboard" element={<Company_Dashboard />} />
//         <Route path="/postjob" element={<Postjob />} />
//         <Route path="/company_profile" element={<Company_Profile />} />
//         <Route path="/adminsignup" element={<AdminSignup />} />
//         <Route path="/admin_dashboard" element={<AdminDashboard />} />
//         <Route path="/application_form/:id" element={<Application />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/newsfeed" element={<Newsfeed />} />
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/contactus" element={<Contactus />} />
//         <Route path="/aboutus" element={<Aboutus />} />
//         <Route path="/received_application:jobId" element={<ReceivedApplication />} />
//         <Route path="/admin_analysis" element={<Admin_analysis />} />
//         <Route path="/approved_jobs" element={<Approved_jobs />} />
//         <Route path="/rejected_jobs" element={<Rejected_jobs />} />
//         <Route path="/chatbot" element={<Chatbot />} />
//         <Route path="/appliedjobs/:id" element={<JobDetailsPage />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//       <ChatbotIcon />
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Registerpage";
import Login from "./pages/Loginpage";
import Home from "./pages/Homepage";
import Company_Register from "./pages/Company_Registerpage";
import Company_Login from "./pages/Company_Loginpage";
import Company_Dashboard from "./pages/company_Dashboard";
import Postjob from "./pages/postjob";
import AdminSignup from "./Admin/Admin_Signup";
import AdminDashboard from "./Admin/AdminDashboard";
import Otpverification from "./pages/otp";
import Application from "./pages/application";
import CompanyOtp from "./pages/company_otp";
import Profile from "./pages/profile";
import Newsfeed from "./pages/newsfeed";
import WelcomePage from "./pages/WelcomePage";
import Courses from "./pages/courses";
import Aboutus from "./pages/aboutus";
import Contactus from "./pages/contactus";
import ReceivedApplication from "./pages/received_Applications";
import Admin_analysis from "./Admin/Admin_analysis";
import Approved_jobs from "./Admin/Approved_jobs";
import Rejected_jobs from "./Admin/Rejected_jobs";
import Error from "./pages/errorpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chatbot from "./components/chatbox";
import "../src/App.css";
import Company_Profile from "./pages/company_profile";
import JobDetailsPage from "./pages/JobDetailsPage";

// Chatbot Icon Component
function ChatbotIcon() {
  const navigate = useNavigate();

  const handleChatbot = () => {
    navigate("/chatbot");
  };

  return (
    <div id="chatbot-icon">
      <img
        src="chatbot.webp"
        alt="Chatbot"
        id="chatbot-img"
        onClick={handleChatbot}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp_verification" element={<Otpverification />} />
        <Route path="/company_register" element={<Company_Register />} />
        <Route path="/company_login" element={<Company_Login />} />
        <Route path="/company_otp_verification" element={<CompanyOtp />} />
        <Route path="/company_dashboard" element={<Company_Dashboard />} />
        <Route path="/postjob" element={<Postjob />} />
        <Route path="/company_profile" element={<Company_Profile />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/application_form/:id" element={<Application />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/received_application/:jobId" element={<ReceivedApplication />} />
        <Route path="/admin_analysis" element={<Admin_analysis />} />
        <Route path="/approved_jobs" element={<Approved_jobs />} />
        <Route path="/rejected_jobs" element={<Rejected_jobs />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/appliedjobs/:id" element={<JobDetailsPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ChatbotIcon />
    </BrowserRouter>
  );
}

export default App;
