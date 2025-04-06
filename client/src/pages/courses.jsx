import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import LocalHeader from '../components/LocalHeader';
import "../css/courses.css";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to ensure full image URLs
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150"; // Fallback image
    return imagePath.startsWith("http") ? imagePath : `http://localhost:5001${imagePath}`;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/courses/userCourses");
        const data = response.data;
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCourses(
      courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.category?.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div id="course-background">
      <div id="course-header">
        <div id="course-logo">
          <span id="career">
            career<span id="link">link</span>
          </span>
        </div>
        <div id="course-search-box">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={handleSearch}
            id="course-search-bar"
          />
          <button type="submit">
            <i className="ri-search-2-line"></i>
          </button>
        </div>
        <div id="course-nav">
            <li><NavLink to="/Home" id="course-nav-element">Home</NavLink></li>
            <li><NavLink to="/newsfeed" id="course-nav-element">Newsfeed</NavLink></li>
            <li><NavLink to="/courses" id="course-nav-element">Courses</NavLink></li>
            <li><NavLink to="/aboutus" id="course-nav-element">About Us</NavLink></li>
            <li><NavLink to="/contactus" id="course-nav-element">Contact Us</NavLink></li>
        </div>
      </div>

      <main id="course-main">
        {error ? (
          <p className="error-message">Error fetching courses: {error}</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
              <div key={course._id} id="course-card">
                <div id="course-image">
                  <img
                    src={getFullImageUrl(course.image)}
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150"; // Fallback image
                    }}
                  />
                </div>
                <div id="course-details">
                <div id="course-details-title">
                  <span>Title : </span> <label>{course.title}</label>
                </div>{" "}
                <div id="course-details-title">
                    <span>Category : </span>{" "}
                    <label>{course.category || "N/A"}</label>
                  </div>
                  <div id="course-details-title">
                    <span>Description : </span>{" "}
                    <label>{course.description}</label>
                  </div>
                  <div id="course-details-title">
                    <span>VideoLink : </span>
                    <label>
                      {course.videoLink && (
                        <p>
                          <a
                            href={course.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Watch Video
                          </a>
                        </p>
                      )}
                    </label>
                  </div>
                  <div id="course-details-title">
                    <span>DownloadLink : </span>
                    <label>
                      {course.downloadLink && (
                        <p>
                          <a
                            href={course.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </p>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="no-courses">No courses found</p>
        )}
      </main>
    </div>
  );
};

export default Courses;