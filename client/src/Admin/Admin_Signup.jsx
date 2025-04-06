import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminSignup() {
  const initialvalues = { Admin_name: "", Admin_email: "", Admin_password: "" };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    if (sessionid.includes("admin_seceret")) {
      navigate("/admin_dashboard");
    } else {
      Cookies.remove("sessionid");
    }
  }, [sessionid, navigate]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formvalues);
    setformerrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:5001/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formvalues),
        });

        const data = await response.json();

        if (response.status === 200) {
          Cookies.set("sessionid", data.sessionid);
          toast.success(data.message, { position: "top-center", autoClose: "3000",hideProgressBar: "false",
              closeOnClick: "true",
              pauseOnHover: "true",
              draggable: "true"});
          navigate("/admin_dashboard");
        } else {
          toast.error(data.message, { position: "top-center", autoClose: "3000",hideProgressBar: "false",
              closeOnClick: "true",
              pauseOnHover: "true",
              draggable: "true"});
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
              closeOnClick: "true",
              pauseOnHover: "true",
              draggable: "true"});
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.Admin_name) errors.Admin_name = "Admin name is required";
    if (!values.Admin_email) errors.Admin_email = "Admin email is required";
    if (!values.Admin_password) errors.Admin_password = "Admin Password is required";
    return errors;
  };

  return (
    <>
      <div id="Authentication-header">
        <div id="Authentication-logo">
          <span id="Authentication-career">
            career<span id="Authentication-link">link</span>
          </span>
        </div>
      </div>
      <div id="form-background">
        <div id="form-box">
          <div id="outer-box">
            <span id="signup-title">Admin Signup Page</span>
            <form onSubmit={handlesubmit}>
              <div id="input-box">
                <i className="ri-user-6-fill"></i>
                <input type="text" name="Admin_name" value={formvalues.Admin_name} onChange={handlechange} required />
                <span>Admin Name </span>
                <div style={{ color: "red" }} id="error">{formerrors.Admin_name}</div>
              </div>
              <div id="input-box">
                <i className="ri-mail-fill"></i>
                <input type="text" name="Admin_email" value={formvalues.Admin_email} onChange={handlechange} required />
                <span>Admin Email </span>
                <div style={{ color: "red" }} id="error">{formerrors.Admin_email}</div>
              </div>
              <div id="input-box">
                <i className="ri-shield-keyhole-fill"></i>
                <input type="password" name="Admin_password" value={formvalues.Admin_password} onChange={handlechange} required />
                <span>Password </span>
                <div style={{ color: "red" }} id="error">{formerrors.Admin_password}</div>
              </div>
              <input type="submit" name="signup" value="Sign Up" id="submit-button" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSignup;
