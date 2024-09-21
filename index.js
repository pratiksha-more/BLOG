const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { Job } = require("./models/jobBoard.js");
const { connectToDb } = require("./utils/config.js");

const app = express();

// Connect to the database
// connectToDb()
//   .then(() => {
//     console.log("Database connection successful!");
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error);
//   });

// app.get("/", async (req, res) => {
//   const allJobs = await Job.find();
//   res.render("index", { allJobs });
// });

async function connectToDatabase() {
  await mongoose.connect("mongodb://localhost:27017/BLOG");
  console.log("Connected to database");
}

connectToDatabase();

const getAllJobs = async () => {
  try {
    const allJobs = await Job.find();
    console.log(allJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

getAllJobs();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  // Define or fetch your data here
  const allJobs = [
    {
      _id: 1,
      position: "Software Engineer",
      company: "Tech Company",
      location: "New York",
      description: "Develop and maintain web applications...",
    },
    {
      _id: 2,
      position: "Data Scientist",
      company: "Data Corp",
      location: "San Francisco",
      description: "Analyze data and build predictive models...",
    },
  ];
  res.render("home", { allJobs });
});

app.get("/user-login", (req, res) => {
  res.render("userlogin");
});

app.post("/user-login", (req, res) => {});

app.get("/user-register", (req, res) => {
  res.render("userregister");
});

app.post("/user-register", (req, res) => {});

app.get("/company-login", (req, res) => {
  res.render("companylogin");
});

app.post("/company-login", (req, res) => {});

app.get("/company-register", (req, res) => {
  res.render("company-register");
});

app.post("/company-register", (req, res) => {});

app.get("/company-register", (req, res) => {
  res.render("companylogin");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 2000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
