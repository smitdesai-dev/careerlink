import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/WelcomePage1.css";

function WelcomePage() {
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";
  useEffect(()=> {
    try {
      if(sessionid.length < 1) {
        Cookies.remove("sessionid");
        return;
      }
      if(sessionid.includes("admin_seceret")) {
        navigate("/admin_dashboard");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/company_register");
  };
  return (
    <>
      <div id="welcomepage">
        <div id="black-background">
          <div id="welcomepage-header">
            <div id="welcomepage-logo">
              <span id="career">
                career<label id="link">link</label>
              </span>
            </div>
            <div id="welcomepage-nav">
              <li>
                <NavLink to="/newsfeed" id="welcomepage-nav-element">
                  Newsfeed
                </NavLink>
              </li>
              <li>
                <NavLink to="/courses" id="welcomepage-nav-element">
                  Course
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutus" id="welcomepage-nav-element">
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contactus" id="welcomepage-nav-element">
                  Contact us
                </NavLink>
              </li>
              <input
                type="button"
                name="company_register"
                value="Company Register"
                id="welcome_company_register_button"
                onClick={handleSubmit}
              />
            </div>
          </div>

          <div id="welcome-span">
            <span>Welcome to careerlink</span>
            <label>Get &nbsp;Your Dream Job Today</label>
            <div id="welcome-nav-element">
              <NavLink to="/login" id="welcome-menu">
                Login
              </NavLink>
              <NavLink to="/signup" id="welcome-menu">
                Signup
              </NavLink>
            </div>
          </div>
        </div>

        <div>
          <img src="welcome-background.jpg" id="welcome-background" alt="" />
          {/* <p>welcome to careerlink</p> */}
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
