import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Rejected_jobs() {
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    const fetchRejectedJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/jobs/rejectedjobs", {
            params: {
              sessionid:sessionid
            }

          }
        );
        if(response.status == 401 || !sessionid.includes("admin_seceret")) {
          navigate("/adminsignup")
          Cookies.remove("sessionid");
        }
        setRejectedJobs(response.data);
      } catch (error) {
        if(error.response.status == 401 || !sessionid.includes("admin_seceret")) {
          navigate("/adminsignup")
          Cookies.remove("sessionid");
        }
        console.log("Error fetching rejected jobs:", error);
      }
    };
    fetchRejectedJobs();
  }, []);

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
          <h2 id="table-title">Rejected Job</h2>
          <div id="Approved-Reject-job-table">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Job Type</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {rejectedJobs.length > 0 ? (
                  rejectedJobs.map((job) => (
                    <tr key={job._id}>
                      <td>{job.company_name}</td>
                      <td>{job.position}</td>
                      <td>{job.location}</td>
                      <td>{job.jobtype}</td>
                      <td>{job.salary}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No rejected jobs available</td>
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

export default Rejected_jobs;
