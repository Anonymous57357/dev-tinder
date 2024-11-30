const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// schema validation
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 40,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: [true, "email must be unique"],
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Invalid Email Addres! ${value}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(`Please put starong password ${value}`);
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      // enum: {
      //   values: ["male", "female", "female"],
      //   message: "{VALUE} is not supported",
      // },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error(`Gender is not valid: ${value}`);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/035/624/129/non_2x/user-profile-person-icon-in-flat-isolated-in-suitable-for-social-media-man-profiles-screensavers-depicting-male-face-silhouettes-for-apps-website-vector.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`Invalid Image URL ${value}`);
        }
      },
    },
    about: {
      type: String,
      default: "This a basic about the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "dev@tinder#$123456", {
    expiresIn: "12h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputUser, passwordHash);

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
