// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../css/Homepage.css";

// function Home() {
//   const [publishedJobs, setPublishedJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const [salaryFilter, setSalaryFilter] = useState([]); // State for salary filter
//   const [jobTypeFilter, setJobTypeFilter] = useState([]); // State for job type filter
//   const navigate = useNavigate();

//   // Fetch published jobs when the component mounts
//   useEffect(() => {
//     const fetchPublishedJobs = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/jobs/verifiedjobs");
//         setPublishedJobs(response.data);
//       } catch (error) {
//         console.error("Error fetching published jobs:", error);
//       }
//     };

//     fetchPublishedJobs();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase()); // Update search term
//   };

//   const handleSalaryFilterChange = (value) => {
//     setSalaryFilter((prevFilters) => {
//       if (prevFilters.includes(value)) {
//         return prevFilters.filter((filter) => filter !== value);
//       } else {
//         return [...prevFilters, value];
//       }
//     });
//   };

//   const handleJobTypeFilterChange = (value) => {
//     setJobTypeFilter((prevFilters) => {
//       if (prevFilters.includes(value)) {
//         return prevFilters.filter((filter) => filter !== value);
//       } else {
//         return [...prevFilters, value];
//       }
//     });
//   };

//   // Filter jobs based on search term, salary filter, and job type filter
//   const filteredJobs = publishedJobs.filter((job) => {
//     const matchesSearch =
//       job.company_name.toLowerCase().includes(searchTerm) ||
//       job.position.toLowerCase().includes(searchTerm) ||
//       job.location.toLowerCase().includes(searchTerm);

//     const matchesSalary =
//       salaryFilter.length === 0 ||
//       salaryFilter.some((filter) => {
//         switch (filter) {
//           case "<200000":
//             return job.salary < 200000;
//           case "200000-300000":
//             return job.salary >= 200000 && job.salary <= 300000;
//           case "300000-500000":
//             return job.salary > 300000 && job.salary <= 500000;
//           case "500000-1000000":
//             return job.salary > 500000 && job.salary <= 1000000;
//           case ">1000000":
//             return job.salary > 1000000;
//           default:
//             return true;
//         }
//       });

//     const matchesJobType =
//       jobTypeFilter.length === 0 || jobTypeFilter.includes(job.jobtype);

//     return matchesSearch && matchesSalary && matchesJobType;
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/company_register");
//   };

//   const handleClick = (e) => {
//     navigate("/profile");
//   };

//   const handlePostcard=(e)=>{
//     navigate("/jobdetails")
//   };

//   var flag=0;
//   const handleFilter=(e)=>{
//     e.preventDefault();
//     console.log("click");

//   const left = document.getElementById("left");
//   const right = document.getElementById("right");
//   const filte_close = document.getElementById("filte_close");
//   const post_card = document.querySelectorAll("#post_card");

//     if(flag==0){
//       left.style.width="20%";
//       left.style.opacity="1";
//       filte_close.style.opacity="1";
//       right.style.width="80%";
//       right.style.display = "grid";
//       right.style.gridTemplateColumns="1fr 1fr 1fr";
//       right.style.columnGap="2vw";
//       post_card.forEach((card) => {
//           card.style.width = "23.7vw";
//         });
//       flag=1;
//       }
//       else{
//       left.style.width="0%";
//       left.style.opacity="0";
//       filte_close.style.opacity="0";
//       right.style.width="100%";
//       right.style.display = "grid";
//       right.style.gridTemplateColumns="1fr 1fr 1fr 1fr";
//       right.style.columnGap="2vw";
//       post_card.forEach((card) => {
//         card.style.width = "22.3vw";
//       });
//       flag=0;
//   }

//   };

//   return (
//     <>
//       <div id="header">
//         <div id="nav">
//           <div id="logo-search-button">
//             <span id="career">career<span id="link">link</span></span>
//             <div id="search-box">
//               <button type="submit">
//                 <i className="ri-search-2-line" id="search-icon"></i>
//               </button>
//               {/* Search bar */}
//               <input
//                 type="text"
//                 placeholder="Search jobs..."
//                 id="search-bar"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 />
//             </div>
//             <div id="filter-icon" onClick={handleFilter}>
//               <i class="ri-filter-3-fill"></i>
//             </div>
//             <input
//               type="button"
//               name="company_register"
//               value="Company Register"
//               id="company_register_button"
//               onClick={handleSubmit}
//               />

//             <div id="profile">
//               <img
//                 src="https://www.w3schools.com/howto/img_avatar.png"
//                 alt="Profile"
//                 id="profile-img"
//                 onClick={handleClick}
//                 />
//             </div>
//           </div>

//           <div id="nav-element">
//             {/* <li><span id="menu" onClick={handleFilter}>filter</span></li> */}
//             <li><NavLink to="/Home" id="menu">Home</NavLink></li>
//             <li><NavLink to="/newsfeed" id="menu">Newsfeed</NavLink></li>
//             <li><NavLink to="/courses" id="menu">Course</NavLink></li>
//             <li><NavLink to="/aboutus" id="menu">About us</NavLink></li>
//             <li><NavLink to="/contactus" id="menu">Contact us</NavLink></li>
//             <li><NavLink to="/" id="menu">logout</NavLink></li>
//           </div>
//         </div>
//       </div>
//       {/* <hr/> */}
//       <main id="Homepage-main">
        // <div id="left">
        //   <span id="filter-title" onClick={handleFilter}>Filter<i class="ri-filter-3-fill"></i></span>
        //   <span id="filte_close" onClick={handleFilter}><i class="ri-close-line"></i></span>
        //   <div id="filter-salary">
        //     <span>Salary: </span>
        //     <div id="salary-type">
        //       <input
        //         type="checkbox"
        //         name="salaryFilter"
        //         checked={salaryFilter.includes("<200000")}
        //         onChange={() => handleSalaryFilterChange("<200000")}
        //         />
        //       &lt;200000
        //     </div>
        //     <div id="salary-type">
        //       <input
        //         type="checkbox"
        //         name="salaryFilter"
        //         checked={salaryFilter.includes("200000-300000")}
        //         onChange={() => handleSalaryFilterChange("200000-300000")}
        //         />
        //       200000-300000
        //     </div>
        //     <div id="salary-type">
        //       <input
        //         type="checkbox"
        //         name="salaryFilter"
        //         checked={salaryFilter.includes("300000-500000")}
        //         onChange={() => handleSalaryFilterChange("300000-500000")}
        //         />
        //       300000-500000
        //     </div>
        //     <div id="salary-type">
        //       <input
        //         type="checkbox"
        //         name="salaryFilter"
        //         checked={salaryFilter.includes("500000-1000000")}
        //         onChange={() => handleSalaryFilterChange("500000-1000000")}
        //         />
        //       500000-1000000
        //     </div>
        //     <div id="salary-type">
        //       <input
        //         type="checkbox"
        //         name="salaryFilter"
        //         checked={salaryFilter.includes(">1000000")}
        //         onChange={() => handleSalaryFilterChange(">1000000")}
        //         />
        //       &gt;1000000
        //     </div>
        //   </div>

        //   <div id="filter-job-type">
        //     <span>Job Type: </span>
        //     <div id="job-type">
        //       <input
        //         type="checkbox"
        //         name="jobTypeFilter"
        //         checked={jobTypeFilter.includes("FullTime")}
        //         onChange={() => handleJobTypeFilterChange("FullTime")}
        //         />
        //       FullTime
        //     </div>
        //     <div id="job-type">
        //       <input
        //         type="checkbox"
        //         name="jobTypeFilter"
        //         checked={jobTypeFilter.includes("PartTime")}
        //         onChange={() => handleJobTypeFilterChange("PartTime")}
        //         />
        //       PartTime
        //     </div>
        //     <div id="job-type">
        //       <input
        //         type="checkbox"
        //         name="jobTypeFilter"
        //         checked={jobTypeFilter.includes("Internship")}
        //         onChange={() => handleJobTypeFilterChange("Internship")}
        //         />
        //       Internship
        //     </div>
        //     <div id="job-type">
        //       <input
        //         type="checkbox"
        //         name="jobTypeFilter"
        //         checked={jobTypeFilter.includes("Temporary")}
        //         onChange={() => handleJobTypeFilterChange("Temporary")}
        //         />
        //       Temporary
        //     </div>
        //   </div>
        // </div>

//         <div id="right">
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <div id="post_card" key={job._id} onClick={handlePostcard}>
//                 <div id="postcard-logo-name-container">
//                   <img
//                     src={`http://localhost:5001/${job.file}`}
//                     alt={job.company_name}
//                     id="postcard-company-logo"
//                   />

//                   <div id="company-name-position">
//                     <span id="company-name">{job.company_name}</span>
//                     <span  id="company-position">{job.position}</span>
//                   </div>
//                 </div>
//                 <div id="company-description">
//                   <span>Description :</span>
//                 </div>
//                 <div id="postcard-description-text">
//                   {job.job_description}
//                 </div>
//                 <div id="company-location">
//                   <label>Location :</label>
//                   <span>{job.location}</span>
//                 </div>
//                 <div id="company-job-type">
//                   <label>Job Type :</label>
//                   <span>{job.jobtype}</span>
//                 </div>
//                 <div id="company-salary">
//                   <label>Salary :</label>
//                   <span>{job.salary}</span>
//                 </div>

//               </div>
//             ))
//           ) : (
//             <p>No published jobs available</p>
//           )}
//         </div>
//       </main>
//     </>
//   );
// }

// export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Homepage.css";
import Cookies from "js-cookie";

function Home() {
  const [publishedJobs, setPublishedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState([]);
  const navigate = useNavigate();
  const sessionid = Cookies.get("sessionid");

  // Fetch jobs from API
  useEffect(() => {
    const fetchPublishedJobs = async () => {
      try {
        axios.post("http://localhost:5001/api/auth/check_login", {
            sessionid:sessionid
          })
        .then(res => {
          if(res.status==401 || !res.data || !res.data.isLoggedIn) {
            Cookies.remove("sessionid");
            navigate("/");
          }
        })
        .catch(err=> {
          if(err.response.status == 401) {
            Cookies.remove("sessionid");
            navigate("/");
          }
        }) 
        axios.get(
          "http://localhost:5001/api/jobs/verifiedjobs", {
            params: {
              sessionid : sessionid
            }
          }
        )
        .then(response => {
          if(response.status==401) {
            Cookies.remove("sessionid");
            navigate("/");
            return;
          }
          setPublishedJobs(response.data);
        })
        .catch(error => {
          if(error.status == 401) {
            Cookies.remove("sessionid");
            navigate("/");
            return;
          }
          console.log(error);
        }) 
        
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchPublishedJobs();
  }, []);

  // Search input handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Salary filter handler
  const handleSalaryFilterChange = (value) => {
    setSalaryFilter((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((f) => f !== value)
        : [...prevFilters, value]
    );
  };

  // Job type filter handler
  const handleJobTypeFilterChange = (value) => {
    setJobTypeFilter((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((f) => f !== value)
        : [...prevFilters, value]
    );
  };

  // Navigate to job details page
  const handlePostcard = (id) => {
    navigate(`/appliedjobs/${id}`);
  };

  // Company register navigation
  const handleSubmit = () => {
    navigate("/company_register");
  };

  // Profile navigation
  const handleClick = () => {
    navigate("/profile");
  };

  // Toggle filter sidebar
  let flag = 0;
  const handleFilter = () => {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const filte_close = document.getElementById("filte_close");
    const post_card = document.querySelectorAll("#post_card");

    if (flag === 0) {
      left.style.width = "20%";
      left.style.opacity = "1";
      filte_close.style.opacity = "1";
      right.style.width = "80%";
      right.style.gridTemplateColumns = "1fr 1fr 1fr";
      post_card.forEach((card) => {
        card.style.width = "23.7vw";
      });
      flag = 1;
    } else {
      left.style.width = "0%";
      left.style.opacity = "0";
      filte_close.style.opacity = "0";
      right.style.width = "100%";
      right.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
      post_card.forEach((card) => {
        card.style.width = "22.3vw";
      });
      flag = 0;
    }
  };

  // Job filtering logic
  const filteredJobs = publishedJobs.filter((job) => {
    const matchesSearch =
      job.company_name.toLowerCase().includes(searchTerm) ||
      job.position.toLowerCase().includes(searchTerm) ||
      job.location.toLowerCase().includes(searchTerm);

    const matchesSalary =
      salaryFilter.length === 0 ||
      salaryFilter.some((filter) => {
        switch (filter) {
          case "<200000":
            return job.salary < 200000;
          case "200000-300000":
            return job.salary >= 200000 && job.salary <= 300000;
          case "300000-500000":
            return job.salary > 300000 && job.salary <= 500000;
          case "500000-1000000":
            return job.salary > 500000 && job.salary <= 1000000;
          case ">1000000":
            return job.salary > 1000000;
          default:
            return true;
        }
      });

    const matchesJobType =
      jobTypeFilter.length === 0 || jobTypeFilter.includes(job.jobtype);

    return matchesSearch && matchesSalary && matchesJobType;
  });

  const handleLogout = () => {
    Cookies.remove("sessionid");
    navigate("/"); 
  };
  
  return (
    <>
      <div id="header">
        <div id="nav">
          <div id="logo-search-button">
            <span id="career">
              career<span id="link">link</span>
            </span>
            <div id="search-box">
              <button type="submit">
                <i className="ri-search-2-line" id="search-icon"></i>
              </button>
              <input
                type="text"
                placeholder="Search jobs..."
                id="search-bar"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div id="filter-icon" onClick={handleFilter}>
              <i className="ri-filter-3-fill"></i>
            </div>
            <input
              type="button"
              name="company_register"
              value="Company Register"
              id="company_register_button"
              onClick={handleSubmit}
            />
            <div id="profile">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile"
                id="profile-img"
                onClick={handleClick}
              />
            </div>
          </div>

          <div id="nav-element">
            <li>
              <NavLink to="/Home" id="menu">Home</NavLink>
            </li>
            <li>
              <NavLink to="/newsfeed" id="menu">Newsfeed</NavLink>
            </li>
            <li>
              <NavLink to="/courses" id="menu">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" id="menu">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contactus" id="menu">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleLogout} id="menu">Logout</NavLink>
            </li>
          </div>
        </div>
      </div>

      <main id="Homepage-main">
      <div id="left">
          <span id="filter-title" onClick={handleFilter}>Filter<i class="ri-filter-3-fill"></i></span>
          <span id="filte_close" onClick={handleFilter}><i class="ri-close-line"></i></span>
          <div id="filter-salary">
            <span>Salary: </span>
            <div id="salary-type">
              <input
                type="checkbox"
                name="salaryFilter"
                checked={salaryFilter.includes("<200000")}
                onChange={() => handleSalaryFilterChange("<200000")}
                />
              &lt;200000
            </div>
            <div id="salary-type">
              <input
                type="checkbox"
                name="salaryFilter"
                checked={salaryFilter.includes("200000-300000")}
                onChange={() => handleSalaryFilterChange("200000-300000")}
                />
              200000-300000
            </div>
            <div id="salary-type">
              <input
                type="checkbox"
                name="salaryFilter"
                checked={salaryFilter.includes("300000-500000")}
                onChange={() => handleSalaryFilterChange("300000-500000")}
                />
              300000-500000
            </div>
            <div id="salary-type">
              <input
                type="checkbox"
                name="salaryFilter"
                checked={salaryFilter.includes("500000-1000000")}
                onChange={() => handleSalaryFilterChange("500000-1000000")}
                />
              500000-1000000
            </div>
            <div id="salary-type">
              <input
                type="checkbox"
                name="salaryFilter"
                checked={salaryFilter.includes(">1000000")}
                onChange={() => handleSalaryFilterChange(">1000000")}
                />
              &gt;1000000
            </div>
          </div>

          <div id="filter-job-type">
            <span>Job Type: </span>
            <div id="job-type">
              <input
                type="checkbox"
                name="jobTypeFilter"
                checked={jobTypeFilter.includes("FullTime")}
                onChange={() => handleJobTypeFilterChange("FullTime")}
                />
              FullTime
            </div>
            <div id="job-type">
              <input
                type="checkbox"
                name="jobTypeFilter"
                checked={jobTypeFilter.includes("PartTime")}
                onChange={() => handleJobTypeFilterChange("PartTime")}
                />
              PartTime
            </div>
            <div id="job-type">
              <input
                type="checkbox"
                name="jobTypeFilter"
                checked={jobTypeFilter.includes("Internship")}
                onChange={() => handleJobTypeFilterChange("Internship")}
                />
              Internship
            </div>
            <div id="job-type">
              <input
                type="checkbox"
                name="jobTypeFilter"
                checked={jobTypeFilter.includes("Temporary")}
                onChange={() => handleJobTypeFilterChange("Temporary")}
                />
              Temporary
            </div>
          </div>
        </div>

        <div id="right">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                id="post_card"
                key={job._id}
                onClick={() => handlePostcard(job._id)}
              >
                <div id="postcard-logo-name-container">
                  <img
                    src={`http://localhost:5001/${job.file}`}
                    alt={job.company_name}
                    id="postcard-company-logo"
                  />
                  <div id="company-name-position">
                    <span id="company-name">{job.company_name}</span>
                    <span id="company-position">{job.position}</span>
                  </div>
                </div>
                <div id="company-description">
                  <span>Description :</span>
                </div>
                <div id="postcard-description-text">{job.job_description}</div>
                <div id="company-location">
                  <label>Location :</label>
                  <span>{job.location}</span>
                </div>
                <div id="company-job-type">
                  <label>Job Type :</label>
                  <span>{job.jobtype}</span>
                </div>
                <div id="company-salary">
                  <label>Salary :</label>
                  <span>{job.salary}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No published jobs available</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
