import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Company_Login() {
  const initialvalues = { email: "", password: "" };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    try {
      if (sessionid.length < 1) {
        Cookies.remove("sessionid");
        return;
      }
      axios.post("http://localhost:5001/api/company/check_login", { sessionid })
        .then((response) => {
          if (response.data && response.data.isLoggedIn) {
            navigate('/company_dashboard');
          } else {
            Cookies.remove("sessionid");
          }
        })
        .catch((err) => {
          console.log(err);
          Cookies.remove("sessionid");
        });
    } catch (error) {
      console.log(error);
      Cookies.remove("sessionid");
    }
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

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formvalues);
    if (Object.keys(errors).length > 0) {
      setformerrors(errors);
    } else {
      setLoading(true); // Show loader
      const Authenticationheader = document.getElementById("Authentication-header");
      const formbackground = document.getElementById("form-background");
      Authenticationheader.style.filter="blur(0.1vw)";
      formbackground.style.filter="blur(0.1vw)";
      try {
        const response = await axios.post(
          "http://localhost:5001/api/company/login",
          formvalues
        );
        showToast(response.data.message, "success");
        navigate("/company_otp_verification", { state: { email: formvalues.email } });
      } catch (error) {
        if (error.response) {
          showToast(error.response.data.message, "error");
          if (error.response.status === 400) navigate("/company_register");
        } else {
          showToast("Something went wrong. Please try again.", "error");
        }
      }finally {
        setLoading(false); // Hide loader
        const Authenticationheader = document.getElementById("Authentication-header");
        const formbackground = document.getElementById("form-background");
        Authenticationheader.style.filter="none";
        formbackground.style.filter="none";
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const email_reg = /^[A-Za-z0-9%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;
    const password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!email_reg.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!password_regex.test(values.password)) {
      errors.password = "Password must be 8-16 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

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
            <span id="signup-title">Company Login</span>
            <form onSubmit={handlesubmit}>
              <div id="input-box">
                <i className="ri-mail-fill"></i>
                <input
                  type="text"
                  name="email"
                  value={formvalues.email}
                  onChange={handlechange}
                  required
                />
                <span>Email</span>
                <div style={{ color: "red" }} id="error">
                  {formerrors.email}
                </div>
              </div>
              <div id="input-box">
                <i className="ri-shield-keyhole-fill"></i>
                <input
                  type="password"
                  name="password"
                  value={formvalues.password}
                  onChange={handlechange}
                  required
                />
                <span>Password</span>
                <div style={{ color: "red" }} id="error">
                  {formerrors.password}
                </div>
              </div>
              <input 
                type="submit" 
                name="login" 
                value="Submit" 
                id="submit-button" 
              />
              <h4 id="login-link">
                Don't have an account? Company <a href="/company_register">Signup</a>
              </h4>
            </form>
          </div>
        </div>
      </div>
      <div className={`loader ${loading ? 'show' : ''}`}></div>
    </>
  );
}

export default Company_Login;
