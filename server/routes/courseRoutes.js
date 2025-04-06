const express = require("express");
const Course = require("../schemas/courses"); // Import model

const router = express.Router();

router.get("/userCourses", async (req, res) => {
  try {
    const courses = await Course.find();

    // Send image URL as part of the JSON response
    res.json(
      courses.map((course) => ({
        title: course.title,
        description: course.description,
        category: course.category,
        downloadLink: course.downloadLink,
        videoLink: course.videoLink,
        image: course.image, // Keeping the image URL
      }))
    );
  } catch (error) {
    res.status(500).send({ message: "Error fetching courses", error });
  }
});

module.exports = router;
