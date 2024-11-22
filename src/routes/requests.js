const express = require("express");

const ConnectionRequest = require("../models/connectionRequest");

const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

const User = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        throw new Error("status not allowed");
      }

      const connectionSendRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      // if there is a existing connection send

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("connection request already eists!");
      }

      // checking the existing user id in the db
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        throw new Error("User not found!");
      }

      const user = await connectionSendRequest.save();

      res
        .status(200)
        .json({ message: "connection request send successful", user });
    } catch (error) {
      res.status(400).json({ message: `ERROR: ${error}` });
    }
  }
);

module.exports = requestsRouter;
