import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Company_Register() {
  const initialvalues = { companyname: "", email: "", password: "" };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});

  const sessionid = Cookies.get("sessionid") || "";
  const navigate = useNavigate();
  useEffect(()=> {
    
    try {
      if(sessionid.length < 1) {
        Cookies.remove("sessionid");
        return;
      }
      axios.post("http://localhost:5001/api/company/check_login",{ sessionid : sessionid})
      .then((response)=> {
        if(response.data && response.data.isLoggedIn) {
          navigate('/company_dashboard');
        } else {
          Cookies.remove("sessionid");
          console.log(response.data)
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
          "http://localhost:5001/api/company/register",
          formvalues
        );
        showToast(response.data.message, "success");

        // Store company name in cookie
        Cookies.set("company_name", formvalues.companyname, { expires: 7 });

        navigate("/company_login", {
          state: { companyname: formvalues.companyname },
        });
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            if (data.message.includes("Company name is already taken")) {
              setformerrors({ companyname: data.message });
            } else if (data.message.includes("Account already exists")) {
              showToast(data.message, "error");
              navigate("/company_login");
            }
          }
        } else {
          showToast("Something went wrong. Please try again.", "error");
        }
      }
    }
  };

  // Validation function
  const validate = (values) => {
    const errors = {};
    const companyname_regex = /^[A-Za-z\s%+-]{2,}$/;
    const email_reg = /^[A-Za-z0-9%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;
    const password_regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!values.companyname) {
      errors.companyname = "Company name is required";
    } else if (!companyname_regex.test(values.companyname)) {
      errors.companyname =
        "Company name must contain only letters and special characters";
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
            <span id="signup-title">Company Signup</span>
            <form onSubmit={handlesubmit}>
              {/* Company Name */}
              <div id="input-box">
                <i className="ri-building-4-fill"></i>
                <input
                  type="text"
                  name="companyname"
                  value={formvalues.companyname}
                  onChange={handlechange}
                  required
                />
                <span>Company Name</span>
                <div style={{ color: "red" }} id="error">
                  {formerrors.companyname}
                </div>
              </div>

              {/* Email */}
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

              {/* Password */}
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

              {/* Submit Button */}
              <input
                type="submit"
                name="signup"
                value="Submit"
                id="submit-button"
              />

              <h4 id="login-link">
                Already have an account? Company{" "}
                <a href="/Company_Login">Login</a>
              </h4>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Company_Register;
