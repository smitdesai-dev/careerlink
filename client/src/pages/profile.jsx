import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/profile.css";

function Profile() {
  const navigate = useNavigate();
  const emailFromCookie = Cookies.get("email");
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    if (sessionid.length < 1) {
      Cookies.remove("sessionid");
      navigate("/");
      return;
    }
    axios.post("http://localhost:5001/api/auth/check_login", { sessionid })
      .then((response) => {
        if (!response.data || !response.data.isLoggedIn) {
          Cookies.remove("sessionid");
          navigate("/");
        }
      })
      .catch(() => {
        Cookies.remove("sessionid");
        navigate("/");
      });
  }, [navigate, sessionid]);

  const initialValues = {
    username: "",
    email: emailFromCookie || "",
    date: "",
    gender: "",
    bio: "",
    address: "",
    skills: "",
    phone: "",
    profilePic: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [preview, setPreview] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    if (emailFromCookie) {
      axios.get(`http://localhost:5001/api/profile?email=${emailFromCookie}`, {
        params: { sessionid }
      })
        .then((response) => {
          setFormValues(response.data);
          setPreview(`http://localhost:5001/${response.data.profilePic}`);
        })
        .catch(() => toast.error("Error fetching profile!", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
      closeOnClick: "true",
      pauseOnHover: "true",
      draggable: "true" }));
    }
  }, [emailFromCookie, sessionid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setFormValues({ ...formValues, profilePic: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }
    formData.append("sessionid", sessionid);

    try {
      await axios.put("http://localhost:5001/api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
      closeOnClick: "true",
      pauseOnHover: "true",
      draggable: "true" });
      navigate("/Home");
      setIsReadOnly(true);
    } catch (error) {
      toast.error("Error updating profile!", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
      closeOnClick: "true",
      pauseOnHover: "true",
      draggable: "true"});
    }
  };

  return (
    <div id="profile-background">
      <div id="profile-box">
        <div id="profile-left">
          <div id="profile-pic">
            <img
              src={preview || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="Profile"
            />
          </div>
        </div>
        <div id="profile-right">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div id="input-profile-box">
              <span>Username:</span>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div id="input-profile-box">
              <span>Email:</span>
              <input type="text" name="email" value={formValues.email} readOnly />
            </div>
            <div id="input-profile-box">
              <span>Birthdate:</span>
              <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleChange}
                readOnly={isReadOnly}
                id="bir-date"
              />
            </div>
            <div id="input-profile-box">
              <span>Gender:</span>
              <input type="radio" name="gender" value="male" checked={formValues.gender === "male"} onChange={handleChange} disabled={isReadOnly} />{" "} Male
              <input type="radio" name="gender" value="female" checked={formValues.gender === "female"} onChange={handleChange} disabled={isReadOnly} />{" "} Female
              <input type="radio" name="gender" value="others" checked={formValues.gender === "others"} onChange={handleChange} disabled={isReadOnly} />{" "} Others
            </div>
            <div id="input-profile-box">
              <span>Bio:</span>
              <textarea rows="3" cols="30" name="bio" value={formValues.bio} onChange={handleChange} readOnly={isReadOnly}  id="profile-textarea"></textarea>
            </div>
            <div id="input-profile-box">
              <span>Address:</span>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div id="input-profile-box">
              <span>Skills:</span>
              <input
                type="text"
                name="skills"
                value={formValues.skills}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div id="input-profile-box">
              <span>Phone No:</span>
              <input
                type="number"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
            <div id="input-profile-box">
              <span>Profile Picture:</span>
              <input type="file" name="profilePic" onChange={handleFileChange} disabled={isReadOnly} id="profilt-pic-get"/>
            </div>
            {!isReadOnly && <input type="submit" value="Save" id="save-button" />}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
