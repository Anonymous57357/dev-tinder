const express = require("express");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

const app = express();

const { connectDB } = require("./config/database");

const User = require("./models/user");
const { userAuth } = require("./middlewares/auth");

const { validateSignupData } = require("./utils/validation");

app.use(cookieParser());
app.use(express.json());

// signup user
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // Validation of data
    validateSignupData(req);

    // encrypting the pasword
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new instance of the User model
    const userObj = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashedPassword,
    });

    await userObj.save();
    res
      .status(200)
      .json({ message: "user created successfully", data: userObj });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// loging user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {

      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token);

      return res.status(200).json({
        message: "User logged in successfully",
        data: user,
      });
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile API - GET all profile
app.get("/profile", userAuth, async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err}` });
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res, next) => {
  const user = req.user;
  res
    .status(200)
    .json({ message: `${user.firstName} send connection successful` });
  console.log("send connecition route");
});

connectDB()
  .then((res) => {
    console.log("database connection succesfull......");
    app.listen(8000, () => console.log("server is listening on PORT 8000"));
  })
  .catch((err) => {
    console.error("database not connected");
  });
