import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LocalHeader.css";
function LocalHeader() {
  return (
    <>
      <div id="local-header">
        <div id="local-logo">
          <span id="career">
            career<span id="link">link</span>
          </span>
        </div>
        <div id="local-nav">
          <li>
            <NavLink to="/Home" id="local-nav-element">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/newsfeed" id="local-nav-element">
              Newsfeed
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" id="local-nav-element">
              Course
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" id="local-nav-element">
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactus" id="local-nav-element">
              Contact us
            </NavLink>
          </li>
        </div>
      </div>
    </>
  );
}

export default LocalHeader;
