const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl gender age about skills";

// get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {     
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    console.log(connectionRequest);

    res
      .status(200)
      .json({ message: "data fetched succesfully", data: connectionRequest });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toSting() === row.toUserId._id.toString()) {
        return row.toUser.id;
      }
    });
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // user should see all the cards except
    // 0 - his own card
    // 1 - his connection (accepted)
    // 2 - ignored profile (ignored)
    // 3 - already send the conneciton request (interested)

    // 4 - rejected profile (rejected) --> only remaining

    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromuserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      if (req.fromUserId) {
        hideUsersFromFeed.add(req.fromUserId.toString());
      }
      if (req.toUserId) {
        hideUsersFromFeed.add(req.toUserId.toString());
      }
    });
    console.log(hideUsersFromFeed);

    res.status(200).json({ data: connectionRequests });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

module.exports = userRouter;
