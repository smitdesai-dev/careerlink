const express = require("express");
const multer = require("multer");
const postjob = require("../schemas/postjob");
const verifiedjobs = require("../schemas/verifiedjob");
const rejectedjobs = require("../schemas/rejectedjob"); // Import the rejected jobs schema
const router = express.Router();
const util = require("./util");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Job posting route with file upload handling
router.post("/postjob", upload.single("file"), async (req, res) => {
  const [userData, status, resData] = await util.company_authenticate(req);
  if (userData === null) {
    return res.status(status).json(resData);
  }

  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required." });
    }

    const {
      company_name,
      position,
      location,
      jobtype,
      salary,
      job_description,
      company_description,
      requirements,
    } = req.body;

    const newjob = new postjob({
      company_name,
      position,
      location,
      jobtype,
      salary,
      job_description,
      company_description,
      requirements,
      file: req.file ? `uploads/${req.file.filename}` : null,
    });

    const data = await newjob.save();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Error posting job" });
  }
});

// Get all unapproved jobs
router.get("/postjob", async (req, res) => {
  try {
    const [userData, status, resData] = await util.company_authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const jobs = await postjob.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// Approve a job
router.post("/approvejob", async (req, res) => {
  try {
    const [userData, status, resData] = await util.company_authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const job = await postjob.findById(req.body._id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Move job to verified jobs
    const approvedJob = new verifiedjobs(job.toObject());
    approvedJob.status = "Approved";
    await approvedJob.save();

    // Delete job from postjob
    await postjob.findByIdAndDelete(req.body._id);

    res.status(200).json({ message: "Job approved successfully" });
  } catch (error) {
    console.error("Error approving job:", error);
    res.status(500).json({ message: "Error approving job" });
  }
});

// Reject a job
router.post("/rejectjob", async (req, res) => {
  try {
    const [userData, status, resData] = await util.company_authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const job = await postjob.findById(req.body._id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Move job to rejected jobs
    const rejectedJob = new rejectedjobs(job.toObject());
    rejectedJob.status = "Rejected";
    await rejectedJob.save();

    // Delete job from postjob
    await postjob.findByIdAndDelete(req.body._id);

    res.status(200).json({ message: "Job rejected successfully" });
  } catch (error) {
    console.error("Error rejecting job:", error);
    res.status(500).json({ message: "Error rejecting job" });
  }
});

// Get all approved jobs
router.get("/verifiedjobs", async (req, res) => {
  try {
    console.log("verified jobs");
    console.log(req.query);

    const [userData, status, resData] = await util.authenticate(req);
    const [companyData, companyStatus, companyResData] =
      await util.company_authenticate(req);
    console.log("userData :" + userData);
    console.log("companydata :" + companyData);
    if (!userData && !companyData) {
      return res.status(status).json(resData);
    }
    const jobs = await verifiedjobs.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs." });
  }
});

// Get all rejected jobs
router.get("/rejectedjobs", async (req, res) => {
  try {
    const [userData, status, resData] = await util.company_authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const jobs = await rejectedjobs.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rejected jobs." });
  }
});

router.get("/jobdetails/:id", async (req, res) => {
  try {
    const [userData, status, resData] = await util.authenticate(req);
    const [companyData, companyStatus, companyResData] =
      await util.company_authenticate(req);
    if (userData === null && companyData == null) {
      return res.status(status).json(resData);
    }
    let job = await verifiedjobs.findById(req.params.id);

    if (!job) {
      job = await postjob.findById(req.params.id);
    }

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Error fetching job details" });
  }
});

module.exports = router;
