import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../css/received_Applications.css";

const ReceivedApplication = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid");

  useEffect(() => {
    if (!sessionid) {
      Cookies.remove("sessionid");
      navigate("/");
      return;
    }

    axios
      .post("http://localhost:5001/api/company/check_login", { sessionid })
      .then((response) => {
        if (!response.data?.isLoggedIn) {
          Cookies.remove("sessionid");
          navigate("/");
        }
      })
      .catch(() => {
        Cookies.remove("sessionid");
        navigate("/");
      });

    axios
      .get(`http://localhost:5001/api/applications?jobId=${jobId}`, { params: { sessionid } })
      .then((response) => {
        setApplications(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [jobId]);

  // Function to trigger file download
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="received_background">
      <h1 id="received-title">Received Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div id="received_application_table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Resume</th>
                <th>Cover Letter</th>
                <th>Experience (Years)</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.contact}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDownload(`http://localhost:5001/${app.resume}`, "Resume.pdf")
                      }
                    >
                      Download Resume
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleDownload(`http://localhost:5001/${app.coverLetter}`, "CoverLetter.pdf")
                      }
                    >
                      Download Cover Letter
                    </button>
                  </td>
                  <td>{app.experience}</td>
                  <td>{Array.isArray(app.skills) ? app.skills.join(", ") : app.skills}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceivedApplication;
