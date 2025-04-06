import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminDashboard.css";
import Cookies from "js-cookie";

function AdminDashboard() {
  const [jobposts, setJobposts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    if (!sessionid.includes("admin_seceret")) {
      navigate("/adminsignup");
      Cookies.remove("sessionid");
    }
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/jobs/postjob", {
          params: { sessionid: sessionid },
        });
        setJobposts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/adminsignup");
          Cookies.remove("sessionid");
        }
        console.log("Error during fetch postjob data:", error);
      }
    };
    fetchJobPosts();
  }, []);

  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleApproval = async (job) => {
    try {
      await axios.post("http://localhost:5001/api/jobs/approvejob", {
        _id: job._id,
        sessionid: sessionid,
      });
      showToast("Job approved successfully", "success");
      setJobposts((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
    } catch (error) {
      console.error("Error during job approval:", error);
      showToast("Failed to approve the job. Please try again.", "error");
    }
  };

  const handleRejection = async (job) => {
    try {
      await axios.post("http://localhost:5001/api/jobs/rejectjob", {
        _id: job._id,
        sessionid: sessionid,
      });
      showToast("Job rejected successfully", "success");
      setJobposts((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
    } catch (error) {
      console.error("Error during job rejection:", error);
      showToast("Failed to reject the job. Please try again.", "error");
    }
  };

  const filteredJobs = jobposts.filter((job) =>
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <main id="admin-main">
        <div id="left_dashboard">
          <div id="Admin-company-logo">
            <span id="career">
              career<span id="link">link</span>
            </span>
          </div>
          <div id="Admin-menu">
            <span onClick={() => navigate("/admin_dashboard")}>
              <i class="ri-dashboard-3-line"></i>Dashboard
            </span>
            <span onClick={() => navigate("/approved_jobs")}>
              <i class="ri-check-double-fill"></i>Approved Jobs
            </span>
            <span onClick={() => navigate("/rejected_jobs")}>
              <i class="ri-close-circle-line"></i>Rejected Jobs
            </span>
            <span onClick={() => navigate("/admin_analysis")}>
              <i class="ri-donut-chart-fill"></i>Analysis
            </span>
          </div>
        </div>
        <div id="right_dashboard">
          <div id="search-box-Admin">
            <button type="submit">
              <i className="ri-search-2-line" id="search-icon"></i>
            </button>
            <input
              type="text"
              placeholder="Search by company name..."
              id="search-bar-Admin"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div id="Admin-table">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Job Type</th>
                  <th>Salary</th>
                  <th>Description</th>
                  <th>Company Description</th>
                  <th>Requirements</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job._id}>
                      {/* <td>{job.file}</td> */}
                      <td>{job.company_name}</td>
                      <td>{job.position}</td>
                      <td>{job.location}</td>
                      <td>{job.jobtype}</td>
                      <td>{job.salary}</td>
                      <td>{job.job_description}</td>
                      <td>{job.company_description}</td>
                      <td>{job.requirements}</td>
                      <td>
                        <button onClick={() => handleApproval(job)} id="Admin-accept-button">
                          Accept
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleRejection(job)} id="Admin-reject-button">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No matching job posts available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminDashboard;
