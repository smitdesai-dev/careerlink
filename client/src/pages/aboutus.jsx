import React from "react";
import LocalHeader from "../components/LocalHeader";
import "../css/aboutus.css";

function Aboutus() {
  return (
    <>
      <LocalHeader />
      <div id="aboutus-main">
        <div id="welcome-container-aboutus">
          <div>
            <h1>About Us</h1>
            <p id="about-text">
              Welcome to CareerLink, your trusted partner in professional
              growth, career development, and workforce solutions. We are
              dedicated to bridging the gap between talented job seekers and
              dynamic employers, ensuring successful connections that drive
              mutual success.
            </p>
          </div>
          <img src="professional.webp" alt="" />
        </div>
        <div id="Mission-container-aboutus">
          <img src="missioncareer.webp" alt="" />
          <div>
            <h1>Our Mission</h1>
            <p id="mission-text">
              At CareerLink, our mission is to empower individuals and
              businesses by providing innovative career solutions, cutting-edge
              recruitment technology, and a seamless job-matching experience. We
              strive to create a world where job seekers can unlock their
              potential and employers can build strong, high-performing teams.
            </p>
          </div>
        </div>
        <div id="weare-container-aboutus">
          <h1>Who We Are</h1>
          <p id="weare-text">
            CareerLink is a premier online job portal and career development
            platform. Since our inception, we have been committed to
            revolutionizing the hiring process by offering smart, data-driven
            solutions that cater to the ever-evolving job market.
          </p>
        </div>
        <div id="wedo-container-aboutus">
          <h1>Who We Do</h1>
          <p id="wedo-text">
            We connect job seekers with employers across various industries,
            offering comprehensive job search tools, career coaching, and
            resume-building services. Our platform leverages advanced AI-driven
            algorithms to match candidates with roles that align with their
            skills, experience, and aspirations.
          </p>
        </div>
        <div id="JobSeekers-container-aboutus">
          <div>
            <h1>Our Commitment to Job Seekers</h1>
            <p id="jobseeker-text">
              We understand that job searching can be overwhelming, which is why
              CareerLink is here to simplify the process.
              <br /> We provide:
              <br />
              - Easy-to-use search filters for quick job discovery
              <br />
              - Career assessments to help you identify the best career path
              <br />
              - Free resume-building tools and cover letter templates
              <br />
              - Expert advice through webinars, articles, and career counseling
              <br />
            </p>
          </div>
          <img src="career.jpg" alt="" />
        </div>
        <div id="Employers-container-aboutus">
          <img src="employer.avif" alt="" />
          <div>
            <h1>Our Services for Employers</h1>
            <p id="employee-text">
              For businesses looking to hire top talent, CareerLink offers:
              <br />
              - AI-powered job posting and applicant tracking
              <br />
              - Employer branding solutions to showcase company culture
              <br />
              - Access to a database of pre-screened candidates
              <br />
              - Recruitment marketing and targeted job ads
              <br />
              - Customizable hiring solutions for businesses of all sizes
              <br />
            </p>
          </div>
          <a href="#welcome-container-aboutus" id="scrollbar">
            <i class="ri-arrow-up-line"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
