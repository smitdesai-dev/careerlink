// import { NavLink } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../css/postjob.css";
// import Cookies from "js-cookie";

// function Postjob() {
//   const initialValues = {
//     file: null,
//     company_name: "",
//     position: "",
//     location: "",
//     jobtype: "",
//     salary: "",
//     job_description: "",
//     company_description: "",
//     requirements: "",
//   };

//   const [formValues, setFormValues] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [uploadedLogo, setUploadedLogo] = useState(null);
//   const navigate = useNavigate();
//   const sessionid = Cookies.get("sessionid") || "";
//   useEffect(()=> {
//     try {
//       if(sessionid.length < 1) {
//         Cookies.remove("sessionid");
//         navigate("/");
//         return;
//       }
//       axios.post("http://localhost:5001/api/company/check_login",{ sessionid : sessionid})
//       .then((response)=> {
//         if(!response.data || !response.data.isLoggedIn) {
//           Cookies.remove("sessionid");
//           navigate('/');
//         }
//       })
//       .catch((err) =>  {
//         console.log(err);
//         Cookies.remove("sessionid");
//         navigate('/');
//       })
      
//     }
//     catch (error) {
//       console.log(error);
//       navigate('/');
//       Cookies.remove("sessionid");
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     if (type === "file") {
//       setFormValues({ ...formValues, file: e.target.files[0] });
//       setUploadedLogo(URL.createObjectURL(e.target.files[0]));
//     } else {
//       setFormValues({ ...formValues, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validate(formValues);
//     setFormErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       const formData = new FormData();
//       formData.append("file", formValues.file);
//       formData.append("company_name", formValues.company_name);
//       formData.append("position", formValues.position);
//       formData.append("location", formValues.location);
//       formData.append("jobtype", formValues.jobtype);
//       formData.append("salary", formValues.salary);
//       formData.append("job_description", formValues.job_description);
//       formData.append("company_description", formValues.company_description);
//       formData.append("requirements", formValues.requirements);
//       formData.append("sessionid",sessionid);

//       axios
//         .post("http://localhost:5001/api/jobs/postjob", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         })
//         .then((response) => {
//           if(response.status==401) {
//             console.log("authentication error");
//             navigate("/");
//             return;
//           }
//           alert("Job posted successfully");
//           navigate("/company_dashboard");
//         })
//         .catch((error) => {
//           if(error.response.status==401) {
//             console.log("authentication error");
//             navigate("/");
//           }
//           console.error("Error posting job", error);
//         });
//     }
//   };

//   const validate = (values) => {
//     const errors = {};
//     const commonRegex = /^[A-Za-z\s]{1,}$/;
//     const descriptionRegex = /^[A-Za-z0-9.\-,\s]{40,}$/;

//     if (!values.file) {
//       errors.file = "Upload your company logo here.";
//     }

//     if (!values.company_name) {
//       errors.company_name = "Company name is required.";
//     } else if (!commonRegex.test(values.company_name)) {
//       errors.company_name =
//         "Company name must contain only letters and spaces.";
//     }

//     if (!values.position) {
//       errors.position = "Position is required.";
//     } else if (!commonRegex.test(values.position)) {
//       errors.position = "Position must contain only letters and spaces.";
//     }

//     if (!values.location) {
//       errors.location = "Location is required.";
//     } else if (!commonRegex.test(values.location)) {
//       errors.location = "Location must contain only letters and spaces.";
//     }

//     if (!values.jobtype || values.jobtype === "choose-an-option") {
//       errors.jobtype = "Please select a job type.";
//     }

//     if (!values.salary) {
//       errors.salary = "Salary is required.";
//     }

//     if (!values.job_description) {
//     errors.job_description = "job_description is required.";
//     } else if (!descriptionRegex.test(values.job_description)) {
//       errors.job_description =
//         "Description must be at least 40 characters long and can include letters, numbers, spaces, and special characters.";
//     }

//     if (!values.company_description) {
//       errors.company_description = "company Description is required.";
//     } else if (!descriptionRegex.test(values.company_description)) {
//       errors.company_description =
//         "Description must be at least 40 characters long and can include letters, numbers, spaces, and special characters.";
//     }

//     if (!values.requirements) {
//       errors.requirements = "requirement field is required.";
//     } else if (!descriptionRegex.test(values.requirements)) {
//       errors.requirements =
//         "requirement field must be at least 40 characters long and can include letters, numbers, spaces, and special characters.";
//     }

//     return errors;
//   };

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import "../css/postjob.css";

function Postjob() {
  const initialValues = {
    file: null,
    company_name: "",
    position: "",
    location: "",
    jobtype: "",
    salary: "",
    job_description: "",
    company_description: "",
    requirements: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    if (sessionid.length < 1) {
      Cookies.remove("sessionid");
      navigate("/");
      return;
    }
    axios
      .post("http://localhost:5001/api/company/check_login", { sessionid })
      .then((response) => {
        if (!response.data || !response.data.isLoggedIn) {
          Cookies.remove("sessionid");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        Cookies.remove("sessionid");
        navigate("/");
      });
  }, [navigate, sessionid]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormValues({ ...formValues, file: e.target.files[0] });
      setUploadedLogo(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("file", formValues.file);
      formData.append("company_name", formValues.company_name);
      formData.append("position", formValues.position);
      formData.append("location", formValues.location);
      formData.append("jobtype", formValues.jobtype);
      formData.append("salary", formValues.salary);
      formData.append("job_description", formValues.job_description);
      formData.append("company_description", formValues.company_description);
      formData.append("requirements", formValues.requirements);
      formData.append("sessionid", sessionid);

      axios
        .post("http://localhost:5001/api/jobs/postjob", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.status === 401) {
            toast.error("Authentication error, redirecting to login.", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
              closeOnClick: "true",
              pauseOnHover: "true",
              draggable: "true"});
            navigate("/");
            return;
          }
          toast.success("Job posted successfully!", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
            closeOnClick: "true",
            pauseOnHover: "true",
            draggable: "true"});
          navigate("/company_dashboard");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error("Authentication error, redirecting to login.", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
              closeOnClick: "true",
              pauseOnHover: "true",
              draggable: "true"});
            navigate("/");
          } else {
            toast.error("Error posting job. Please try again.", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
              closeOnClick: "true",
              pauseOnHover: "true",
              draggable: "true"});
            console.error("Error posting job", error);
          }
        });
    }
  };

  const validate = (values) => {
    const errors = {};
    const commonRegex = /^[A-Za-z\s]{1,}$/;
    const descriptionRegex = /^[A-Za-z0-9.\-,\s]{40,}$/;
    

    if (!values.file) {
      errors.file = "Upload your company logo here.";
    }

    if (!values.company_name) {
      errors.company_name = "Company name is required.";
    } else if (!commonRegex.test(values.company_name)) {
      errors.company_name = "Company name must contain only letters and spaces.";
    }

    if (!values.position) {
      errors.position = "Position is required.";
    } else if (!commonRegex.test(values.position)) {
      errors.position = "Position must contain only letters and spaces.";
    }

    if (!values.location) {
      errors.location = "Location is required.";
    } else if (!commonRegex.test(values.location)) {
      errors.location = "Location must contain only letters and spaces.";
    }

    if (!values.jobtype || values.jobtype === "choose-an-option") {
      errors.jobtype = "Please select a job type.";
    }

    if (!values.salary) {
      errors.salary = "Salary is required.";
    }

    if (!values.job_description) {
      errors.job_description = "Job description is required.";
    } else if (!descriptionRegex.test(values.job_description)) {
      errors.job_description =
        "Description must be at least 40 characters long and can include letters, numbers, spaces, and special characters.";
    }

    if (!values.company_description) {
      errors.company_description = "Company description is required.";
    } else if (!descriptionRegex.test(values.company_description)) {
      errors.company_description =
        "Description must be at least 40 characters long and can include letters, numbers, spaces, and special characters.";
    }

    if (!values.requirements) {
      errors.requirements = "Requirements field is required.";
    } else if (!descriptionRegex.test(values.requirements)) {
      errors.requirements =
        "Requirements field must be at least 40 characters long and can include letters, numbers, spaces, and special characters.";
    }

    return errors;
  };
  return (
    <>
      <div id="company-dashboard-header">
        <div id="logo-nav">
          <div id="logo">
            <span id="career">
              career<span id="link">link</span>
            </span>
          </div>
          <div id="company-dashboard-nav">
            <li>
              <NavLink to="/company_dashboard" id="company-menu">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/postjob" id="company-menu">
                Post Job
              </NavLink>
            </li>
          </div>
        </div>
      </div>
      <div id="post-form-background">
        {/* <div id="form-nav">
        <li>
          <NavLink to="/company_dashboard" id="form-menu">Home</NavLink>
        </li>
      </div> */}
        <main id="background-postjob">
          <div id="outer-box-postjob">
            <span id="postjob-title">Post Job Here</span>
            <form onSubmit={handleSubmit}>
              <div id="input-box-postjob">
                <span>Company Logo :</span>
                <input
                  type="file"
                  id="input-logo-postjob"
                  name="file"
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.file}</div>

              {uploadedLogo && (
                <div>
                  <img
                    src={uploadedLogo}
                    alt="Uploaded Logo"
                    style={{
                      width: "8vw",
                      height: "5vw",
                      margin: "0 0 0 2vw",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              <div id="input-box-postjob">
                <span>Company Name:</span>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Ex. Microsoft"
                  value={formValues.company_name}
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.company_name}</div>

              <div id="input-box-postjob">
                <span>Position:</span>
                <input
                  type="text"
                  name="position"
                  placeholder="Ex. Software Engineer"
                  value={formValues.position}
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.position}</div>

              <div id="input-box-postjob">
                <span>Location:</span>
                <input
                  type="text"
                  name="location"
                  placeholder="Ex. Gujarat"
                  value={formValues.location}
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.location}</div>

              <div id="input-box-postjob">
                <span>Job Type:</span>
                <select
                  name="jobtype"
                  value={formValues.jobtype}
                  onChange={handleChange}
                >
                  <option value="choose-an-option">Choose an option</option>
                  <option value="FullTime">Full-Time</option>
                  <option value="PartTime">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>
              <div id="postjob-error">{formErrors.jobtype}</div>

              <div id="input-box-postjob">
                <span>Salary:</span>
                <input
                  type="number"
                  name="salary"
                  placeholder="Ex. 100000"
                  value={formValues.salary}
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.salary}</div>
              <div id="input-box-postjob">
                <span>job description:</span>
                <textarea
                  name="job_description"
                  placeholder="Write your job_description..."
                  cols={30}
                  // rows={3}
                  value={formValues.job_description}
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.job_description}</div>

              {/* company_description*/}

              <div id="input-box-postjob">
                <span>Company Description:</span>
                <textarea
                  name="company_description"
                  placeholder="Write your company details..."
                  cols={30}
                  // rows={3}
                  value={formValues.company_description}
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.company_description}</div>

              {/* requirements */}
              <div id="input-box-postjob">
                <span>Company requirements :</span>
                <textarea
                  name="requirements"
                  placeholder="ex. experience,skills"
                  cols={30}
                  // rows={3}
                  value={formValues.requirements}
                  onChange={handleChange}
                />
              </div>
              <div id="postjob-error">{formErrors.requirements}</div>

              <input type="submit" value="Post Job" id="post-button" />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Postjob;
