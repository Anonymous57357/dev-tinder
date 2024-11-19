const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://projectDB:mukesh@mukesh-project.eyahwld.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
