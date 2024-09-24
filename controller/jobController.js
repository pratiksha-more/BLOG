const { User } = require("../models/userlogin.js");
const { Job } = require("../models/jobBoard.js");

const userLogin = async (req, res) => {
  const { id } = req.query;

  try {
    const allJobs = await Job.find();

    let userRecord = null;
    if (id) {
      userRecord = await User.findById(id);
    }

    return res.render("userlogin", {
      allJobs,
      record: userRecord,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching jobs or user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const userLoginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("userlogin", { error: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render("userlogin", { error: "Invalid email or password." });
    }
    return res.redirect("/");
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  userLogin,
  userLoginPost,
};
