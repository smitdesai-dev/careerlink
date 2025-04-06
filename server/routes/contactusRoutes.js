const express = require("express");
const contactusSchema = require("../schemas/contactus");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");

router.use(cors());

router.post("/contactus", async (req, res) => {
  const { name, email, location, comments, question } = req.body;
  try {
    const contactus = new contactusSchema({
      name,
      email,
      location,
      comments,
      question,
    });

    await contactus.save();

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
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Us Inquiry from ${name}`,
      html: `
                    <h3>Contact Details:</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <h3>User Message:</h3>
                    <p><strong>Comments:</strong> ${comments}</p>
                    <p><strong>Question:</strong> ${question}</p>
                `,
    });

    res.status(200).json({ message: "your response send successfully " });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
