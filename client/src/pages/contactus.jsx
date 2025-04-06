// import { useState } from "react";
// import axios from "axios";
// import LocalHeader from "../components/LocalHeader";
// import "../css/contactus.css";

// function Contactus() {
//   const initialvalues = {
//     name: "",
//     email: "",
//     location: "",
//     comments: "",
//     question: "",
//   };
//   const [formvalues, setformvalues] = useState(initialvalues);
//   const [formerrors, setformerrors] = useState({});

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setformvalues({ ...formvalues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = validate(formvalues);
//     if (Object.keys(errors).length > 0) {
//       setformerrors(errors);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5001/api/contactus", formvalues);
//       alert("Your response was sent successfully!");
//       setformvalues(initialvalues);
//       setformerrors({});
//     } catch (error) {
//       alert("Failed to send your response. Please try again.");
//     }
//   };

//   const validate = (values) => {
//     const errors = {};
//     const name_regex = /^[A-Za-z\s]+$/;
//     const email_reg = /^[A-Za-z0-9%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;

//     if (!name_regex.test(values.name)) {
//       errors.name = "Name must contain only letters.";
//     }
//     if (!email_reg.test(values.email)) {
//       errors.email = "Invalid email format.";
//     }

//     return errors;
//   };

//   return (
//     <>
//       <LocalHeader />
//       <div id="contactus-background">
//         <div id="contactus-text">
//           <h1>Contact Us</h1>
//           <div id="contactus-sometext">
//             <h5>
//               Please use the form below to provide feedback or ask questions. We
//               would love to hear from you!
//             </h5>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} id="contactus-form">
//           <div id="contactus-input-box">
//             <input
//               type="text"
//               name="name"
//               value={formvalues.name}
//               onChange={handlechange}
//               required
//             />
//             <span>Name</span>
//           </div>
//           <div style={{ color: "red" }} id="contactus-error">
//             {formerrors.name}
//           </div>

//           <div id="contactus-input-box">
//             <input
//               type="text"
//               name="email"
//               value={formvalues.email}
//               onChange={handlechange}
//               required
//             />
//             <span>Email</span>
//           </div>
//           <div style={{ color: "red" }} id="contactus-error">
//             {formerrors.email}
//           </div>

//           <div id="contactus-input-box">
//             <input
//               type="text"
//               name="location"
//               value={formvalues.location}
//               onChange={handlechange}
//               required
//             />
//             <span>Location</span>
//           </div>

//           <div id="contactus-input-box">
//             <textarea
//               name="comments"
//               cols={30}
//               rows={3}
//               value={formvalues.comments}
//               onChange={handlechange}
//               required
//             ></textarea>
//             <span>Comments</span>
//           </div>

//           <div id="contactus-input-box">
//             <textarea
//               name="question"
//               cols={30}
//               rows={3}
//               value={formvalues.question}
//               onChange={handlechange}
//               required
//             ></textarea>
//             <span>Questions</span>
//           </div>

//           <input
//             type="submit"
//             name="submit"
//             value="Submit"
//             id="contactus-submit-button"
//           />
//         </form>
//       </div>
//     </>
//   );
// }

// export default Contactus;

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LocalHeader from "../components/LocalHeader";
// import "../css/contactus.css";

// function Contactus() {
//   const initialvalues = {
//     name: "",
//     email: "",
//     location: "",
//     comments: "",
//     question: "",
//   };
//   const [formvalues, setformvalues] = useState(initialvalues);
//   const [formerrors, setformerrors] = useState({});

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setformvalues({ ...formvalues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = validate(formvalues);
//     if (Object.keys(errors).length > 0) {
//       setformerrors(errors);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5001/api/contactus", formvalues);
//       toast.success("Your response was sent successfully!", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
//               closeOnClick: "true",
//               pauseOnHover: "true",
//               draggable: "true"});
//       setformvalues(initialvalues);
//       setformerrors({});
//     } catch (error) {
//       toast.error("Failed to send your response. Please try again.", { position: "top-center", autoClose: "3000",hideProgressBar: "false",
//               closeOnClick: "true",
//               pauseOnHover: "true",
//               draggable: "true"});
//     }
//   };

//   const validate = (values) => {
//     const errors = {};
//     const name_regex = /^[A-Za-z\s]+$/;
//     const email_reg = /^[A-Za-z0-9%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;

//     if (!name_regex.test(values.name)) {
//       errors.name = "Name must contain only letters.";
//     }
//     if (!email_reg.test(values.email)) {
//       errors.email = "Invalid email format.";
//     }

//     return errors;
//   };

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocalHeader from "../components/LocalHeader";
import "../css/contactus.css";

function Contactus() {
  const initialvalues = {
    name: "",
    email: "",
    location: "",
    comments: "",
    question: "",
  };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validate(formvalues);
    if (Object.keys(errors).length > 0) {
      setformerrors(errors);
      return;
    }

    setLoading(true);
    document.getElementById("contactus-background").style.filter = "blur(0.1vw)";
    document.getElementById("localheader-wrapper").style.filter = "blur(0.1vw)";

    try {
      await axios.post("http://localhost:5001/api/contactus", formvalues);
      toast.success("Your response was sent successfully!", { position: "top-center", autoClose: 3000 });
      setformvalues(initialvalues);
      setformerrors({});
    } catch (error) {
      toast.error("Failed to send your response. Please try again.", { position: "top-center", autoClose: 3000 });
    } finally {
      setLoading(false);
      document.getElementById("contactus-background").style.filter = "none";
      document.getElementById("localheader-wrapper").style.filter = "none";
    }
  };

  const validate = (values) => {
    const errors = {};
    const name_regex = /^[A-Za-z\s]+$/;
    const email_reg = /^[A-Za-z0-9%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!name_regex.test(values.name)) {
      errors.name = "Name must contain only letters.";
    }
    if (!email_reg.test(values.email)) {
      errors.email = "Invalid email format.";
    }

    return errors;
  };

  return (
    <>
      <div id="localheader-wrapper">
         <LocalHeader />
      </div>
      <div id="contactus-background">
        <div id="contactus-text">
          <h1>Contact Us</h1>
          <div id="contactus-sometext">
            <h5>
              Please use the form below to provide feedback or ask questions. We
              would love to hear from you!
            </h5>
          </div>
        </div>

        <form onSubmit={handleSubmit} id="contactus-form">
          <div id="contactus-input-box">
            <input
              type="text"
              name="name"
              value={formvalues.name}
              onChange={handlechange}
              required
            />
            <span>Name</span>
          </div>
          <div style={{ color: "red" }} id="contactus-error">
            {formerrors.name}
          </div>

          <div id="contactus-input-box">
            <input
              type="text"
              name="email"
              value={formvalues.email}
              onChange={handlechange}
              required
            />
            <span>Email</span>
          </div>
          <div style={{ color: "red" }} id="contactus-error">
            {formerrors.email}
          </div>

          <div id="contactus-input-box">
            <input
              type="text"
              name="location"
              value={formvalues.location}
              onChange={handlechange}
              required
            />
            <span>Location</span>
          </div>

          <div id="contactus-input-box">
            <textarea
              name="comments"
              cols={30}
              rows={3}
              value={formvalues.comments}
              onChange={handlechange}
              required
            ></textarea>
            <span>Comments</span>
          </div>

          <div id="contactus-input-box">
            <textarea
              name="question"
              cols={30}
              rows={3}
              value={formvalues.question}
              onChange={handlechange}
              required
            ></textarea>
            <span>Questions</span>
          </div>

          <input
            type="submit"
            name="submit"
            value="Submit"
            id="contactus-submit-button"
          />
        </form>
      </div>
      <div className={`loader ${loading ? 'show' : ''}`}></div>
    </>
  );
}

export default Contactus;
