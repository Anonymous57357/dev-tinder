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

    const savedUser = await userObj;

    const token = await savedUser.getJWT();
    console.log(token);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-site cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      path: "/", // Accessible across the app
    };

    res.cookie("cookies_token", token, cookieOptions);

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

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-site cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        path: "/", // Accessible across the app
      };
      res.cookie("cookies_token", token, cookieOptions);

      return res.status(200).json({
        message: "User logged in successfully",
        token,
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
  res.cookie("cookies_token", null, { expires: new Date(Date.now() + 900000) });
  res.status(200).json({ message: "user logged out sucessfully" });
});

module.exports = authRouter;
