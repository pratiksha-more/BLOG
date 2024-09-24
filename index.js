const path = require("path");
const express = require("express");
const { connectToDb } = require("./utils/config.js");
const mongoose = require("mongoose");
const { userJob } = require("./models/userlogin.js");
const { Job } = require("./models/jobBoard.js");
const jobController = require("./controller/jobController.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectToDb();

app.get("/", async (req, res) => {
  try {
    const allJobs = await Job.find();
    res.render("home", { allJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user-login", jobController.userLogin);
app.post("/user-login", jobController.userLoginPost);

app.get("/user-register", (req, res) => {
  res.render("userregister");
});

app.post("/user-register", (req, res) => {});

app.get("/company-login", (req, res) => {
  res.render("companylogin");
});

app.post("/company-login", (req, res) => {});

app.get("/company-register", (req, res) => {
  res.render("companyregister");
});

app.post("/company-register", (req, res) => {});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 2000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
