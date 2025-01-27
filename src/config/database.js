require("dotenv").config(); // Load environment variables from .env

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString =
      "mongodb+srv://mukesh:mukesh@database.4u0of.mongodb.net/";
    const dbName = "devtinder-db";

    if (!connectionString || !dbName) {
      throw new Error(
        "Environment variables MONOGODB_CONNECTION_STRING or DB_NAME are not defined."
      );
    }

    await mongoose.connect(connectionString, {
      dbName, // Use the database name from the environment variable
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if unable to connect
  }
};

module.exports = { connectDB };
