const express = require("express");

const profileRouter = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validatePassword,
} = require("../utils/validation");

profileRouter.get("/profile", userAuth, async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err}` });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res, next) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );

    await loggedInUser.save();

    res.status(200).json({
      message: `${loggedInUser.firstName}: profile updated succesfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error}` });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.message}` });
  }
});

module.exports = profileRouter;
