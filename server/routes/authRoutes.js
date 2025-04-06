//done
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const register = require("../schemas/register");
const Analytics = require("../schemas/admin_analysis");
const moment = require("moment");
const dotenv = require("dotenv");
const router = express.Router();
const util = require("./util");

dotenv.config();
router.use(cors());

const updateAnalytics = async (type) => {
  const today = moment().format("YYYY-MM-DD");
  let analytics = await Analytics.findOne({ date: today });
  if (!analytics) {
    analytics = new Analytics({ date: today });
  }
  if (type === "signup") analytics.signups += 1;
  else if (type === "login") analytics.logins += 1;
  await analytics.save();
};

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await register.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new register({
      username,
      email,
      password: hashedPassword,
      loginHistory: [],
    });
    await newUser.save();
    await updateAnalytics("signup");
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await register.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "Account does not exist." });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ message: "Incorrect password" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    existingUser.otp = otp;
    existingUser.loginHistory.push({
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    await existingUser.save();
    await updateAnalytics("login");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"CareerLink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification",
      html: `<b>Your OTP is ${otp}</b>`,
    });

    res.status(200).json({ message: `OTP sent to ${email}.` });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/otp_verification", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const existingUser = await register.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User not found." });

    if (existingUser.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP." });

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

router.post("/resend_otp", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await register.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User not found." });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    existingUser.otp = otp;
    await existingUser.save();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: `"CareerLink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Resend OTP",
      html: `<b>Your new OTP is ${otp}</b>`,
    });
    res.status(200).json({ message: `New OTP sent to ${email}.` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/check_login", async (req, res) => {
  try {
    const [userData, status, resData] = await util.authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    } else {
      res.status(200).json({
        isLoggedIn: true,
        username: userData.username,
        message: "Session found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
