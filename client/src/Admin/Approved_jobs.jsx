import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Approvejob.css";
import Cookies from "js-cookie";

function ApprovedJobs() {
  const [approvedJobs, setApprovedJobs] = useState([]);
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    const fetchApprovedJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/jobs/verifiedjobs", {
            params:{
              sessionid:sessionid
            }
          }
        );
        if(response.status == 401 || !sessionid.includes("admin_seceret")) {
          navigate("/adminsignup")
          Cookies.remove("sessionid");
        }

        setApprovedJobs(response.data);
      } catch (error) {
        if(error.response.status == 401 || !sessionid.includes("admin_seceret")) {
          navigate("/adminsignup")
          Cookies.remove("sessionid");
        }
        console.log("Error fetching approved jobs:", error);
      }
    };
    fetchApprovedJobs();
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
          <h2 id="table-title">Approved Jobs</h2>
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
                {approvedJobs.length > 0 ? (
                  approvedJobs.map((job) => (
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
                    <td colSpan="5">No approved jobs available</td>
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

export default ApprovedJobs;
