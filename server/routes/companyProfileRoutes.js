const express = require("express");
const multer = require("multer");
const CompanyProfile = require("../schemas/company_profile");
const router = express.Router();
const util = require("./util");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Fetch company profile
router.get("/company_profile", async (req, res) => {
  const { email } = req.query;
  console.log("get company profile");
  try {
    const [userData, status, resData] = await util.company_authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const profile = await CompanyProfile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update company profile
router.put(
  "/company_profile",
  upload.single("profilePic"),
  async (req, res) => {
    const [userData, status, resData] = await util.company_authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const { email, companyName, establishedDate, city, state, phone, vision } =
      req.body;
    const profilePic = req.file ? req.file.path : undefined;

    try {
      let profile = await CompanyProfile.findOne({ email });
      if (!profile) {
        profile = new CompanyProfile({
          email,
          companyName,
          establishedDate,
          city,
          state,
          phone,
          vision,
          profilePic,
        });
      } else {
        profile.companyName = companyName;
        profile.establishedDate = establishedDate;
        profile.city = city;
        profile.state = state;
        profile.phone = phone;
        profile.vision = vision;
        if (profilePic) profile.profilePic = profilePic;
      }

      await profile.save();
      res.json({ message: "Profile updated successfully", profile });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
    }
  }
);

module.exports = router;
