const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const CompanyRegister = require("../schemas/company_register");
const Analytics = require("../schemas/admin_analysis"); // Import Analytics model
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();
router.use(cors());

// Utility function to update analytics data
const updateAnalytics = async (type) => {
  const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  let analyticsEntry = await Analytics.findOne({ date: today });

  if (!analyticsEntry) {
    analyticsEntry = new Analytics({ date: today });
  }

  if (type === "signup") {
    analyticsEntry.company_signups += 1;
  } else if (type === "login") {
    analyticsEntry.company_logins += 1;
  }

  await analyticsEntry.save();
};

// Register route
router.post("/register", async (req, res) => {
  try {
    const { companyname, email, password } = req.body;

    const existingUser = await CompanyRegister.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account already exists. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new CompanyRegister({
      companyname,
      email,
      password: hashedPassword,
    });

    await newCompany.save();
    await updateAnalytics("signup"); // Update company signups count

    res.status(201).json({ message: "Signup successful! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await CompanyRegister.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Account does not exist. Please sign up first." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    existingUser.otp = otp;
    existingUser.loginHistory.push({});
    await existingUser.save();

    await updateAnalytics("login"); // Update company logins count

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"CareerLink" <info.smit.desai@gmail.com>',
      to: email,
      subject: "OTP Verification",
      html: `<b>Welcome to CareerLink! Your OTP is ${otp}.</b>`,
    });

    res.status(200).json({ message: `OTP sent to ${email}.` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// OTP verification route
router.post("/company_otp_verification", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const existingUser = await CompanyRegister.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found. Please sign up first." });
    }

    if (existingUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    existingUser.isVerified = true;
    existingUser.otp = null;
    existingUser.sessionId = uuidv4();
    await existingUser.save();

    res.status(200).json({
      message: "OTP verified.",
      email: existingUser.email,
      sessionid: existingUser.sessionId,
      token: existingUser.sessionId, // Using sessionId as token
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Resend OTP route
router.post("/resend_otp", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await CompanyRegister.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found." });
    }

    // Generate new OTP and update the user record
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    existingUser.otp = otp;
    await existingUser.save();

    // Check if environment variables are correctly set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ message: "Email configuration error." });
    }

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CareerLink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Resend OTP",
      html: `<b>Your new OTP is ${otp}</b>`,
    });

    res.status(200).json({ message: `New OTP sent to ${email}.` });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res
      .status(500)
      .json({ message: "Server error occurred.", error: error.message });
  }
});

router.post("/check_login", async (req, res) => {
  const { sessionid } = req.body;
  try {
    console.log(req.body);
    if (sessionid.includes("admin_seceret")) {
      console.log("avoid admin");
      return res
        .status(200)
        .json({ isLoggedIn: false, message: "User not logged in" });
    }
    const existingSession = await CompanyRegister.findOne({
      sessionId: sessionid,
    });
    if (!existingSession)
      return res
        .status(200)
        .json({ isLoggedIn: false, message: "User not logged in" });
    res.status(200).json({
      isLoggedIn: true,
      username: existingSession.username,
      message: "Session found",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
