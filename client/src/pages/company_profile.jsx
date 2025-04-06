import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/company_profile.css";

function Company_Profile() {
  const navigate = useNavigate();
  const emailFromCookie = Cookies.get("company_email");
  const companyNameState = Cookies.get("company_name");

  const initialValues = {
    companyName: companyNameState || "",
    email: emailFromCookie || "",
    establishedDate: "",
    city: "",
    state: "",
    phone: "",
    vision: "",
    profilePic: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [preview, setPreview] = useState("");
  const sessionid = Cookies.get("sessionid") || "";

  useEffect(() => {
    if (sessionid.length < 1) {
      Cookies.remove("sessionid");
      navigate("/company_login");
      return;
    }
    axios.post("http://localhost:5001/api/company/check_login", { sessionid })
      .then((response) => {
        if (!response.data || !response.data.isLoggedIn) {
          Cookies.remove("sessionid");
          navigate("/company_login");
        }
      })
      .catch(() => {
        Cookies.remove("sessionid");
        navigate("/company_login");
      });
  }, [navigate, sessionid]);

  useEffect(() => {
    if (emailFromCookie) {
      axios.get(`http://localhost:5001/api/company_profile?email=${emailFromCookie}`, {
        params: { sessionid }
      })
      .then((response) => {
        setFormValues(response.data);
        setPreview(`http://localhost:5001/${response.data.profilePic}`);
      })
      .catch(() => toast.error("Error fetching company profile!", { position: "top-center", autoClose: "3000" }));
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
      await axios.put("http://localhost:5001/api/company_profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Company profile updated successfully!", { position: "top-center", autoClose:3000,hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true});
      navigate("/company_Dashboard");
    } catch (error) {
      toast.error("Error updating company profile!", { position: "top-center", autoClose: 3000,hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true});
    }
  };

  return (
    <div id="profile-background">
      <div id="profile-box">
        <div id="profile-left">
          <div id="profile-pic">
            <img
              src={preview || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="Company Profile"
            />
          </div>
        </div>
        <div id="profile-right">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div id="input-profile-box">
              <span>Company Name:</span>
              <input type="text" name="companyName" value={formValues.companyName} readOnly />
            </div>
            <div id="input-profile-box">
              <span>Email:</span>
              <input type="text" name="email" value={formValues.email} readOnly />
            </div>
            <div id="input-profile-box">
              <span>Established Date:</span>
              <input type="date" name="establishedDate" value={formValues.establishedDate} onChange={handleChange} id="bir-date" />
            </div>
            <div id="input-profile-box">
              <span>City:</span>
              <input type="text" name="city" value={formValues.city} onChange={handleChange} />
            </div>
            <div id="input-profile-box">
              <span>State:</span>
              <input type="text" name="state" value={formValues.state} onChange={handleChange} />
            </div>
            <div id="input-profile-box">
              <span>Phone No:</span>
              <input type="number" name="phone" value={formValues.phone} onChange={handleChange} />
            </div>
            <div id="input-profile-box">
              <span>Vision:</span>
              <input type="text" name="vision" value={formValues.vision} onChange={handleChange} />
            </div>
            <div id="input-profile-box">
              <span>Company Logo:</span>
              <input type="file" name="profilePic" onChange={handleFileChange} id="profilt-pic-get"/>
            </div>
            <input type="submit" value="Save" id="save-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Company_Profile;
