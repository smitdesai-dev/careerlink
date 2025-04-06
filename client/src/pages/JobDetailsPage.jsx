import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../css/JobDetailsPage.css";

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionid = Cookies.get("sessionid");
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/jobs/jobdetails/${id}`, {
            params: {
              sessionid : sessionid
            }
          }
        );
        console.log("Fetched Job:", response.data); 
        setJob(response.data);
      } catch (error) {
        if(error.response && error.response.status==401) {
          navigate("/");
        }
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleApplicationForm = (e) => {
    e.preventDefault();
    navigate(`/application_form/${id}`);
  };

  if (loading) return <div>Loading job details...</div>;
  if (!job) return <div>No job details found.</div>;

  return (
    <div id="jobdetail_background">
      <div id="job_detail_img_container">
        <img
          src={`http://localhost:5001/${job.file}`}
          alt={job.company_name}
          id="jobdetail-company-logo"
        />
        <div id="job_detail_container">
          <h1 id="company_title_detail">{job.company_name}</h1>
          <p id="position_detail">
            <strong>Position : </strong> 
            <label>{job.position}</label>
          </p>
          <p id="location_detail">
            <strong>Location : </strong> 
            <label>{job.location}</label>
          </p>
          <p id="job_type_detail">
            <strong>Job Type : </strong> 
            <label>{job.jobtype}</label>
          </p>
          <p id="salary_detail">
            <strong>Salary : </strong>
            <label>{job.salary}</label>
          </p>
          <hr/>
          <p id="job_description_detail">
            <strong>Job Description : </strong> 
            <label>{job.job_description}</label>
          </p>
          <hr/>
          <p id="requirements_detail">
            <strong>Requirements : </strong> 
            <label>{job.requirements}</label>
          </p>
          <hr/>
          <p id="company_description_detail">
            <strong>Company Description : </strong> 
            <label>{job.company_description}</label>
          </p>
          <hr/>
          <input
          type="submit"
          name="submit"
          value="Apply Now"
          onClick={handleApplicationForm}
          id="job_apply_button"
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
