import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Admin_analysis.css";
import axios from "axios";

const COLORS = ["#ff6f61", "#42a5f5", "#66bb6a", "#ffcc00"]; // Colors for Pie Chart

const Admin_analysis = () => {
  const [analytics, setAnalytics] = useState([]);
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";
  const reportRef = useRef();

  useEffect(() => {
    if (!sessionid.includes("admin_seceret")) {
      navigate("/adminsignup");
      Cookies.remove("sessionid");
      return;
    }
    axios
      .get("http://localhost:5001/api/admin/analytics", {
        params: {
          sessionid: sessionid,
        },
      })
      .then((res) => {
        if (res.status == 401) {
          navigate("/adminsignup");
          Cookies.remove("sessionid");
          return;
        }
        let data = res.data;
        console.log("Fetched Data:", data);
        setAnalytics(data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigate("/adminsignup");
          Cookies.remove("sessionid");
          return;
        }
        console.error("Fetch Error:", err);
      });
  }, []);

  const userData = [
    {
      name: "User Signups",
      value: analytics.reduce((sum, item) => sum + (item.signups || 0), 0),
    },
    {
      name: "User Logins",
      value: analytics.reduce((sum, item) => sum + (item.logins || 0), 0),
    },
  ];

  const companyData = [
    {
      name: "Company Signups",
      value: analytics.reduce((sum, item) => sum + (item.company_signups || 0), 0),
    },
    {
      name: "Company Logins",
      value: analytics.reduce((sum, item) => sum + (item.company_logins || 0), 0),
    },
  ];

  // Function to download PDF
  const downloadReport = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Admin_Analytics_Report.pdf");
    });
  };

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
              <i className="ri-dashboard-3-line"></i>Dashboard
            </span>
            <span onClick={() => navigate("/approved_jobs")}>
              <i className="ri-check-double-fill"></i>Approved Jobs
            </span>
            <span onClick={() => navigate("/rejected_jobs")}>
              <i className="ri-close-circle-line"></i>Rejected Jobs
            </span>
            <span onClick={() => navigate("/admin_analysis")}>
              <i className="ri-donut-chart-fill"></i>Analysis
            </span>
          </div>
        </div>

        <div id="analysis_right_dashboard" ref={reportRef}>
        
          <div id="user-side-analysis">
            <h3>User Signups Per Day</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="signups" fill="#42a5f5" name="User Signups" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h3>User Logins Per Day</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="logins" fill="#ff6f61" name="User Logins" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h3>Overall User Signups & Logins</h3>
            <div className="chart-container pie-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={userData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                    <Cell fill="#42a5f5" />
                    <Cell fill="#ff6f61" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div id="company-side-analysis">
            <h3>Company Signups Per Day</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="company_signups" fill="#ffcc00" name="Company Signups" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h3>Company Logins Per Day</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="company_logins" fill="#66bb6a" name="Company Logins" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h3>Overall Company Signups & Logins</h3>
            <div className="chart-container pie-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={companyData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                    <Cell fill="#ffcc00" />
                    <Cell fill="#66bb6a" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <button className="download-btn" onClick={downloadReport}>
            Download Report
          </button>
          </div>
        </div>

      </main>
    </>
  );
};

export default Admin_analysis;
