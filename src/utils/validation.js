const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("firstName and lastName required!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid Password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditFields.includes(fields)
  );

  const { photoUrl, about } = req.body;
  if (!validator.isURL(photoUrl)) {
    throw new Error("Invalid Photo URL");
  }

  return isEditAllowed;
};
module.exports = { validateSignupData, validateEditProfileData };
