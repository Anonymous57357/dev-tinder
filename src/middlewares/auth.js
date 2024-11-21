const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token");
    }

    const decodedMessage = await jwt.verify(token, "dev@tinder#$123456");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist!");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err}` });
  }
};
