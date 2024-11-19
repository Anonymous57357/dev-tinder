const bcrypt = require("bcrypt");

const hashedPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { hashedPassword };
