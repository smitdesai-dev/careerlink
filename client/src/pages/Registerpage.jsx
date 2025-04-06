import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Registerpage.css";
import Cookies from "js-cookie";

function Register() {
  const initialvalues = { username: "", email: "", password: "" };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";
  useEffect(()=> {
    try {
      if(sessionid.length < 1) {
        Cookies.remove("sessionid");
        return;
      }
      axios.post("http://localhost:5001/api/auth/check_login",{ sessionid : sessionid})
      .then((response)=> {
        if(response.data && response.data.isLoggedIn) {
          navigate('/home');
        } else {
          Cookies.remove("sessionid");
        }
      })
      .catch((err) =>  {
        console.log(err);
        Cookies.remove("sessionid");
      })
      
    }
    catch (error) {
      console.log(error);
      Cookies.remove("sessionid");
    }
  },);
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
      try {
        const response = await axios.post(
          "http://localhost:5001/api/auth/register",
          formvalues
        );
        showToast(response.data.message, "success");
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          showToast(error.response.data.message, "error");
          navigate("/login");
        } else {
          showToast("Something went wrong. Please try again.", "error");
        }
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const username_reg = /^[a-zA-Z0-9\s_.-]+$/;
    const email_reg = /^[A-Za-z0-9%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;
    const password_regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!values.username) {
      errors.username = "Username is required";
    } else if (!username_reg.test(values.username)) {
      errors.username =
        "Invalid username. Only letters, numbers, and _, ., - are allowed.";
    } else if (values.username.length < 4) {
      errors.username = "Username must be at least 4 characters long";
    } else if (values.username.length > 10) {
      errors.username = "Username cannot be more than 10 characters long";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!email_reg.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!password_regex.test(values.password)) {
      errors.password =
        "Password must contain one digit, one lowercase, one uppercase, one special character, and be 8-16 characters long";
    }

    return errors;
  };

  const redirection = (e) => {
    e.preventDefault();
    navigate("/company_register");
  };

  return (
    <>
      <div id="Authentication-header">
        <div id="Authentication-logo">
          <span id="Authentication-career">
            career<span id="Authentication-link">link</span>
          </span>
        </div>
        <input
          type="button"
          name="company_register"
          value="Company Register"
          id="form-company_register_button"
          onClick={redirection}
        />
      </div>
      <div id="form-background">
        <div id="form-box">
          <div id="outer-box">
            <span id="signup-title">Signup</span>
            <form onSubmit={handlesubmit}>
              <div id="input-box">
                <i className="ri-user-6-fill"></i>
                <input
                  type="text"
                  name="username"
                  value={formvalues.username}
                  onChange={handlechange}
                  required
                />
                <span>Username</span>
                <div style={{ color: "red" }} id="error">
                  {formerrors.username}
                </div>
              </div>
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
                name="signup"
                value="Submit"
                id="submit-button"
              />
              <h4 id="login-link">
                Already have an account? <a href="/login">Login</a>
              </h4>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
