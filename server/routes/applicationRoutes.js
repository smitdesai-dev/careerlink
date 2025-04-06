const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Application = require("../schemas/applications");
const Job = require("../schemas/verifiedjob"); // Job model
const util = require("./util");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST application route
router.post(
  "/applications",
  upload.fields([{ name: "resume" }, { name: "coverLetter" }]),
  async (req, res) => {
    const [userData, status, resData] = await util.authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }

    const { jobId, name, email, contact, experience, dob, careerlink, github, skills } = req.body;

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid or missing Job ID" });
    }

    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const resume = req.files["resume"] ? req.files["resume"][0].path : null;
      const coverLetter = req.files["coverLetter"] ? req.files["coverLetter"][0].path : null;

      const newApplication = new Application({
        jobId,
        name,
        email,
        contact,
        experience,
        dob,
        careerlink,
        github,
        skills: JSON.parse(skills),
        resume,
        coverLetter,
      });

      await newApplication.save();
      res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
      console.error("Error during application submission:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// GET applications by jobId
router.get("/applications", async (req, res) => {
  const { jobId } = req.query;
  if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid or missing Job ID" });
  }

  try {
    const applications = await Application.find({ jobId }).populate("jobId");
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
