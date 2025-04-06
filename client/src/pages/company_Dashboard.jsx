import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../css/company-dashboard.css";

function Company_Dashboard() {
  const [jobs, setJobs] = useState([]);
  const sessionid = Cookies.get("sessionid") || "";
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      console.log("fetch jobs sessionid: " + sessionid);
      const response = await axios.get("http://localhost:5001/api/jobs/verifiedjobs", {
        params: { sessionid },
      });
      setJobs(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        Cookies.remove("sessionid");
        navigate("/company_login");
      }
    }
  };

  useEffect(() => {
    console.log("check login sessionid: " + sessionid);
    axios.post("http://localhost:5001/api/company/check_login", { sessionid })
      .then((response) => {
        console.log(response.data);
        if (!response.data?.isLoggedIn) {
          Cookies.remove("sessionid");
          navigate("/company_login");
        }
      })
      .catch((err) => {
        console.log(err);
        Cookies.remove("sessionid");
        navigate("/company_login");
      });
    fetchJobs();
  }, []);

  const handleClick = () => {
    navigate("/company_profile");
  };

  const handleLogout = () => {
    Cookies.remove("sessionid");
    navigate("/"); 
  };

  return (
    <div id="company-dashboard-background">
      <div id="company-dashboard-header">
        <div id="logo-nav">
          <div id="logo">
            <span id="career">
              career<span id="link">link</span>
            </span>
          </div>
          <div id="company-dashboard-nav">
            <li><NavLink to="/company_dashboard" id="company-menu">Home</NavLink></li>
            <li><NavLink to="/postjob" id="company-menu">Post Job</NavLink></li>
            {/* <li><NavLink to="/received_application" id="company-menu">Applications</NavLink></li> */}
            <li><NavLink to="/" id="company-menu" onClick={handleLogout}>Logout</NavLink></li>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" id="company-profile-img" onClick={handleClick} />
          </div>
        </div>
      </div>
      <main id="company-dashboard-main">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} id="cdashboard-job-card">
              <div id="cdashboard-postcard-logo-name-container">
                <img src={`http://localhost:5001/${job.file}`} alt={job.company_name} id="cdashboard-postcard-company-logo" />
                <div id="cdashboard-company-name-position">
                  <span id="cdashboard-company-name">{job.company_name}</span>
                  <span id="cdashboard-company-position">{job.position}</span>
                </div>
              </div>
              <div id="cdashboard-company-description"><span>Description:</span></div>
              <div id="cdashboard-postcard-description-text">{job.job_description}</div>
              <div id="cdashboard-company-location"><label>Location:</label><span>{job.location}</span></div>
              <div id="cdashboard-company-job-type"><label>Job Type:</label><span>{job.jobtype}</span></div>
              <div id="cdashboard-company-salary"><label>Salary:</label><span>{job.salary}</span></div>
              <button onClick={() => navigate(`/received_application/${job._id}`)} id="view_button">View Applications</button>
            </div>
          ))
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </main>
    </div>
  );
}

export default Company_Dashboard;


// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";

// function Company_Dashboard() {
//   const [jobs, setJobs] = useState([]);
//   const sessionid = Cookies.get("sessionid") || "";
//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/jobs/verifiedjobs", {
//         params: { sessionid },
//       });
//       setJobs(response.data);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         Cookies.remove("sessionid");
//         navigate("/company_login");
//       }
//     }
//   };

//   useEffect(() => {
//     axios.post("http://localhost:5001/api/company/check_login", { sessionid })
//       .then((response) => {
//         if (!response.data?.isLoggedIn) {
//           Cookies.remove("sessionid");
//           navigate("/company_login");
//         }
//       })
//       .catch(() => {
//         Cookies.remove("sessionid");
//         navigate("/company_login");
//       });
    
//     fetchJobs();
//   }, []);

//   return (
//     <div id="company-dashboard">
//       <h1>Company Dashboard</h1>
//       {jobs.length > 0 ? (
//         jobs.map((job) => (
//           <div key={job._id}>
//             <h2>{job.position}</h2>
//             <button onClick={() => navigate(`/received_application/${job._id}`)}>
//               View Applications
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No jobs posted yet.</p>
//       )}
//     </div>
//   );
// }

// export default Company_Dashboard;
