const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.encrypt = async (password) => {
  if (!password) {
    return "Password is required!";
  }
  return bcrypt.hash(password, saltRounds);
};

exports.decrypt = async (password, userPassword) => {
  return bcrypt.compare(password, userPassword);
};
