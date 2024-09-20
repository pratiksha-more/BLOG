const mongoose = require("mongoose");
async function connectToDb() {
  await mongoose.connect("mongodb://localhost:27017/BLOG").then(() => {
    console.log("Mongoose connection established");
  });
}

module.exports = { connectToDb };
