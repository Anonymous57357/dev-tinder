const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.userAuth = async (req, res, next) => {
  try {
    const { cookies_token } = req.cookies;
    console.log(cookies_token);
    if (!cookies_token) {
      return res.status(401).send("Please Login!");
    }

    const decodedMessage = await jwt.verify(
      cookies_token,
      "dev@tinder#$123456"
    );

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
