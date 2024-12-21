const express = require("express");

const ConnectionRequest = require("../models/connectionRequest");

const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

const User = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    // from userId => toUserId
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

requestsRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      const { status, requestId } = req.params;

      // allowed status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error(`status not allowed`);
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId, // from -> fromUserId
        toUserId: loggedInUser._id, // -> toUser
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      return res
        .status(200)
        .json({ message: "Connection request" + status, data });
    } catch (error) {
      res.status(400).json({ message: `ERROR: ${error}` });
    }
  }
);

module.exports = requestsRouter;
