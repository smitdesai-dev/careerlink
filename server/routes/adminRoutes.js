require("dotenv").config();

const express = require("express");
const router = express.Router();
const analytics = require("../schemas/admin_analysis");
const name = process.env.Admin_name;
const email = process.env.Admin_email;
const password = process.env.Admin_password;
const util = require("./util");
const register = require("../schemas/company_register");
const { v4: uuidv4 } = require("uuid");

const cors = require("cors");
router.use(cors());

// Backend code (adminRoutes.js)
router.post("/login", async (req, res) => {
  const { Admin_name, Admin_email, Admin_password } = req.body;

  // Validation logic here
  if (
    Admin_name === name &&
    Admin_email === email &&
    Admin_password === password
  ) {
    let adminuser = await register.findOne({ email: Admin_email });
    if (!adminuser) {
      adminuser = new register({
        companyname: Admin_name,
        email: Admin_email,
        password: Admin_password,
        isVerified: true,
        sessionId: uuidv4() + "admin_seceret",
      });
    } else {
      adminuser.companyname = Admin_name;
      adminuser.email = Admin_email;
      adminuser.password = Admin_password;
      adminuser.isVerified = true;
      adminuser.sessionId = uuidv4() + "admin_seceret";
    }
    await adminuser.save();
    return res
      .status(200)
      .json({ message: "Admin is authorised", sessionid: adminuser.sessionId });
  } else {
    return res.status(400).json({ message: "Missing required fields" });
  }
});

// Get analytics data for admin panel
router.get("/analytics", async (req, res) => {
  try {
    const [userData, status, resData] = await util.company_authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const data = await analytics.find().sort({ date: -1 }).limit(30); // Fetch last 30 days
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
