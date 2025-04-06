//done
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  date: String,
  gender: String,
  bio: String,
  address: String,
  skills: String,
  phone: String,
  profilePic: {
    type: String,
    default: "https://www.w3schools.com/howto/img_avatar.png",
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
