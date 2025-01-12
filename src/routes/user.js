const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { DEFAULT_PER_PAGE } = require("../config/constant");

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
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || DEFAULT_PER_PAGE;

    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // user should see all the cards except
    // 0. his own card (self card)
    // 1. his connected connections (accepted)
    // 2. his ignored connections (ignored)
    // 3. his send connection request (interested)

    // find  all connection request (send + request) (interested or (ignored or accepted))

    const loggedInUser = req.user;

    // console.log(loggedInUser);
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString()),
        hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed), // hide users whether intereseted or ingonered or accepted
          },
        },
        {
          _id: {
            $ne: loggedInUser._id, // hiding current login user
          },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    console.log(users);

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

module.exports = userRouter;
