const express = require("express");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");


profileRouter.get("/profile", userAuth, async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err}` });
  }
});


module.exports = profileRouter