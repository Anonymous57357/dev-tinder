const express = require("express");

const authRouter = express.Router();

const User = require("../models/user");

const bcrypt = require("bcrypt");

const { validateSignupData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
    return res.status(500).json({ error: "Internal Server Error", error });
  }
});

authRouter.post("/logout", (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now() + 900000) });
  res.status(200).json({ message: "user logged out sucessfully" });
});

module.exports = authRouter;
