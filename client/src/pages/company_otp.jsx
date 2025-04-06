// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import "../css/otp.css";

// function CompanyOtp() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const emailFromState =
//     location.state?.email || Cookies.get("company_email") || "";

//   useEffect(() => {
//     if (emailFromState) {
//       Cookies.set("company_email", emailFromState, { expires: 1 });
//     }
//   }, [emailFromState]);

//   const [formValues, setFormValues] = useState({
//     email: emailFromState,
//     otp: "",
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [timer, setTimer] = useState(30);
//   const [resendDisabled, setResendDisabled] = useState(true);

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearTimeout(countdown);
//     } else {
//       setResendDisabled(false);
//     }
//   }, [timer]);
//   const sessionid = Cookies.get("sessionid") || "";
//   useEffect(()=> {
    
//     try {
//       if(sessionid.length < 1) {
//         Cookies.remove("sessionid");
//         return;
//       }
//       axios.post("http://localhost:5001/api/company/check_login",{ sessionid : sessionid})
//       .then((response)=> {
//         if(response.data && response.data.isLoggedIn) {
//           navigate('/company_dashboard');
//         } else {
//           Cookies.remove("sessionid");
//           console.log(response.data)
//         }
//       })
//       .catch((err) =>  {
//         console.log(err);
//         Cookies.remove("sessionid");
//       })
      
//     }
//     catch (error) {
//       console.log(error);
//       Cookies.remove("sessionid");
//     }
//   },);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "otp" && !/^\d{0,4}$/.test(value)) return;

//     setFormValues((prev) => ({ ...prev, [name]: value.trim() }));
//     setFormErrors((prev) => ({ ...prev, [name]: "" }));
//     setServerError("");
//   };

//   const validate = (values) => {
//     const errors = {};
//     if (!values.email) errors.email = "Email is required.";
//     if (!values.otp) errors.otp = "OTP is required.";
//     else if (!/^\d{4}$/.test(values.otp))
//       errors.otp = "OTP must be a 4-digit number.";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validate(formValues);
//     if (Object.keys(errors).length) {
//       setFormErrors(errors);
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/company/company_otp_verification",
//         { email: emailFromState, otp: formValues.otp }
//       );
//       console.log(response)
//       if (
//         response.data.token &&
//         response.data.sessionid 
//       ) {
//         Cookies.set("token", response.data.token, { expires: 1 });
//         Cookies.set("sessionid", response.data.sessionid, {
//           expires: 1,
//         });
//         // Cookies.set("companyname", response.data.companyname, { expires: 1 });
//       }

//       alert("OTP verification successful!");
//       navigate("/company_dashboard");
//     } catch (error) {
//       setServerError(
//         error.response?.data?.message || "An unexpected error occurred."
//       );
//     }
//   };

//   const handleResendOtp = async () => {
//     if (resendDisabled) return;
//     try {
//       await axios.post("http://localhost:5001/api/company/resend_otp", {
//         email: emailFromState,
//       });
//       alert(`New OTP sent to ${emailFromState}`);
//       setResendDisabled(true);
//       setTimer(30);
//     } catch (error) {
//       alert(error.response?.data?.message || "Error resending OTP.");
//     }
//   };

//   return (
//     <>
//       <div id="Authentication-header">
//         <div id="Authentication-logo">
//           <span id="Authentication-career">
//             career<span id="Authentication-link">link</span>
//           </span>
//         </div>
//       </div>
//       <div id="otp-background">
//         <div id="outer-box-otp">
//           <span id="otp-title">OTP Verification</span>
//           <form onSubmit={handleSubmit}>
//             <div id="otp-input-box">
//               <i className="ri-mail-fill"></i>
//               <input
//                 type="text"
//                 name="email"
//                 value={formValues.email}
//                 readOnly
//               />
//               <span id="emailid">Email</span>
//               <div id="otp-error">{formErrors.email}</div>
//             </div>
//             <div id="otp-input-box">
//               <i className="ri-lock-password-fill"></i>
//               <input
//                 type="text"
//                 name="otp"
//                 value={formValues.otp}
//                 onChange={handleChange}
//                 required
//                 maxLength={4}
//               />
//               <span>OTP</span>
//               <div id="otp-error">{formErrors.otp}</div>
//             </div>
//             <div style={{ color: "red", margin: "10px 0" }}>{serverError}</div>
//             <button type="submit" id="verifybutton">
//               Verify
//             </button>
//             <div id="resend-section">
//               {timer > 0 ? (
//                 <p>Resend OTP in {timer} seconds</p>
//               ) : (
//                 <span
//                   onClick={handleResendOtp}
//                 >
//                   Resend OTP
//                 </span>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CompanyOtp;


import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/otp.css";

function CompanyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromState =
    location.state?.email || Cookies.get("company_email") || "";

  useEffect(() => {
    if (emailFromState) {
      Cookies.set("company_email", emailFromState, { expires: 1 });
    }
  }, [emailFromState]);

  const [formValues, setFormValues] = useState({
    email: emailFromState,
    otp: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otp" && !/^\d{0,4}$/.test(value)) return;

    setFormValues((prev) => ({ ...prev, [name]: value.trim() }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Email is required.";
    if (!values.otp) errors.otp = "OTP is required.";
    else if (!/^\d{4}$/.test(values.otp))
      errors.otp = "OTP must be a 4-digit number.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/company/company_otp_verification",
        { email: emailFromState, otp: formValues.otp }
      );
      if (response.data.token && response.data.sessionid) {
        Cookies.set("token", response.data.token, { expires: 1 });
        Cookies.set("sessionid", response.data.sessionid, { expires: 1 });
      }

      showToast("OTP verification successful!", "success");
      navigate("/company_dashboard");
    } catch (error) {
      showToast(error.response?.data?.message || "An unexpected error occurred.", "error");
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;
    try {
      await axios.post("http://localhost:5001/api/company/resend_otp", {
        email: emailFromState,
      });
      showToast(`New OTP sent to ${emailFromState}`, "info");
      setResendDisabled(true);
      setTimer(30);
    } catch (error) {
      showToast(error.response?.data?.message || "Error resending OTP.", "error");
    }
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
      <div id="otp-background">
        <div id="outer-box-otp">
          <span id="otp-title">OTP Verification</span>
          <form onSubmit={handleSubmit}>
            <div id="otp-input-box">
              <i className="ri-mail-fill"></i>
              <input type="text" name="email" value={formValues.email} readOnly />
              <span id="emailid">Email</span>
              <div id="otp-error">{formErrors.email}</div>
            </div>
            <div id="otp-input-box">
              <i className="ri-lock-password-fill"></i>
              <input type="text" name="otp" value={formValues.otp} onChange={handleChange} required maxLength={4} />
              <span>OTP</span>
              <div id="otp-error">{formErrors.otp}</div>
            </div>
            <div style={{ color: "red", margin: "10px 0" }}>{serverError}</div>
            <button type="submit" id="verifybutton">Verify</button>
            <div id="resend-section">
              {timer > 0 ? (
                <p>Resend OTP in {timer} seconds</p>
              ) : (
                <span onClick={handleResendOtp}>Resend OTP</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CompanyOtp;
