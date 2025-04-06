const express = require("express");
const multer = require("multer");
const Profile = require("../schemas/profile");
const util = require("./util");

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Update Profile Route
router.put("/profile", upload.single("profilePic"), async (req, res) => {
  try {
    const [userData, status, resData] = await util.authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const { username, email, date, gender, bio, address, skills, phone } =
      req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required for updating profile." });
    }

    let updateData = { username, date, gender, bio, address, skills, phone };

    if (req.file) {
      updateData.profilePic = `uploads/${req.file.filename}`; // Store relative path
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      updateData,
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Fetch Profile Route
router.get("/profile", async (req, res) => {
  try {
    const [userData, status, resData] = await util.authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required to fetch profile." });
    }

    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

router.get("/profile-picture", async (req, res) => {
  try {
    const [userData, status, resData] = await util.authenticate(req);
    if (userData === null) {
      return res.status(status).json(resData);
    }
    const user = await User.findById(req.user.id);
    res.json({ profilePicture: user.profilePic });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile picture" });
  }
});

module.exports = router;
