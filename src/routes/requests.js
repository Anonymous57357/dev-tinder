const express = require("express");

const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestsRouter.post(
  "/sendConnectionRequest",
  userAuth,
  async (req, res, next) => {
    const user = req.user;
    res
      .status(200)
      .json({ message: `${user.firstName} send connection successful` });
    console.log("send connecition route");
  }
);

module.exports = requestsRouter;
