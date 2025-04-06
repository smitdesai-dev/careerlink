import React, { useEffect, useState } from "react";
import "../css/application.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Application() {
  const sessionid = Cookies.get("sessionid") || "";
  const { id } = useParams(); // Get jobId from the URL params
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    experience: "",
    dob: "",
    resume: null,
    coverLetter: null,
    careerlink: "",
    github: "",
    jobId: id, // Ensure jobId is passed to formData
  });

 
  useEffect(()=> {
    try {
      if(sessionid.length < 1) {
        Cookies.remove("sessionid");
        navigate("/");
        return;
      }
      axios.post("http://localhost:5001/api/auth/check_login",{ sessionid : sessionid})
      .then((response)=> {
        if(!response.data || !response.data.isLoggedIn) {
          Cookies.remove("sessionid");
          navigate('/');
        }
      })
      .catch((err) =>  {
        console.log(err);
        Cookies.remove("sessionid");
        navigate('/');
      })
      
    }
    catch (error) {
      console.log(error);
      navigate('/');
      Cookies.remove("sessionid");
    }
  },[sessionid, navigate]);


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

  const [errors, setErrors] = useState({});

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    if (
      window.confirm(`Are you sure you want to remove the skill: ${skill}?`)
    ) {
      setSkills(skills.filter((s) => s !== skill));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData); // Run validation on form data
    setErrors(validationErrors); // Set errors if any

    if (Object.keys(validationErrors).length > 0) return; // Prevent submission if errors exist

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("sessionid", sessionid);
    formDataToSubmit.append("jobId", formData.jobId); // Ensure jobId is appended here
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("contact", formData.contact);
    formDataToSubmit.append("experience", formData.experience);
    formDataToSubmit.append("dob", formData.dob);
    formDataToSubmit.append("careerlink", formData.careerlink);
    formDataToSubmit.append("github", formData.github);
    formDataToSubmit.append("skills", JSON.stringify(skills));
    // Ensure the resume and cover letter are files and added correctly
    if (formData.resume) {
      formDataToSubmit.append("resume", formData.resume); // Attach the file for resume
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        resume: "Resume is required",
      }));
      return;
    }

    if (formData.coverLetter) {
      formDataToSubmit.append("coverLetter", formData.coverLetter); // Attach the file for cover letter
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        coverLetter: "Cover letter is required",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/applications",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showToast("application send successfully","success");
      navigate("/home");
      console.log("Application submitted:", response.data);

    } catch (error) {
      // Check if the error is from the server response
      if(error.response && error.response.status==401) {
        Cookies.remove("sessionid");
        navigate("/");
        return;
      }
      console.error(
        "Error submitting application:",
        error.response?.data || error.message
      );
      if (error.response) {
        setErrors({
          submit: error.response.data.message || "Submission failed",
        });
      } else {
        setErrors({ submit: "An unexpected error occurred" });
      }
    }
  };

  const validate = (formData) => {
    const errors = {};

    const name_regex = /^[A-Za-z\s]+$/;
    const email_regex = /^[A-Za-z0-9%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;
    const contact_regex = /^[0-9]{10}$/;

    if (!formData.name) {
      errors.name = "Name is required";
    } else if (!name_regex.test(formData.name)) {
      errors.name = "Name should only contain letters and spaces";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!email_regex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.contact) {
      errors.contact = "Contact number is required";
    } else if (!contact_regex.test(formData.contact)) {
      errors.contact = "Contact number should be 10 digits";
    }

    if (!formData.experience) {
      errors.experience = "Experience level is required";
    }

    if (skills.length === 0) {
      errors.skills = "At least one skill is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    }

    if (!formData.resume) {
      errors.resume = "Resume is required";
    }

    if (!formData.coverLetter) {
      errors.coverLetter = "Cover letter is required";
    }

    return errors;
  };

  return (
    <div id="apply-box">
      <div id="apply-outer-box">
        <span id="apply-title">Application Form</span>
        <form onSubmit={handleSubmit}>
          <div id="apply-input-box">
            <span>Enter your Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div id="apply-error">{errors.name}</div>
          </div>

          <div id="apply-input-box">
            <span>Enter your Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div id="apply-error">{errors.email}</div>
          </div>

          <div id="apply-input-box">
            <span>Enter your Contact:</span>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
            <div id="apply-error">{errors.contact}</div>
          </div>

          <div id="apply-input-box">
            <span>Experience Level:</span>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            >
              <option value="">Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
            <div id="apply-error">{errors.experience}</div>
          </div>

          <div id="apply-input-box">
            <span>Enter your Skills:</span>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill"
            />
            <button type="button" onClick={handleAddSkill} id="addbutton">
              Add
            </button>
            <div>
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{ display: "inline-block", margin: "5px" }}
                >
                  {skill}{" "}
                  <button onClick={() => handleRemoveSkill(skill)}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div id="apply-error">{errors.skills}</div>
          </div>

          <div id="apply-input-box">
            <span>Enter your Date of Birth:</span>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              id="birthdate"
            />
            <div id="apply-error">{errors.dob}</div>
          </div>

          <div id="apply-input-box">
            <span>Upload your Resume:</span>
            <input
              type="file"
              name="resume"
              id="input-file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <div id="apply-error">{errors.resume}</div>
          </div>

          <div id="apply-input-box">
            <span>Upload your Cover Letter:</span>
            <input
              type="file"
              name="coverLetter"
              id="input-file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <div id="apply-error">{errors.coverLetter}</div>
          </div>

          <div id="apply-input-box">
            <span>CareerLink Profile:</span>
            <input
              type="text"
              name="careerlink"
              value={formData.careerlink}
              onChange={handleInputChange}
            />
            <div id="apply-error">{errors.careerlink}</div>
          </div>

          <div id="apply-input-box">
            <span>GitHub Profile:</span>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" id="apply-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Application;
