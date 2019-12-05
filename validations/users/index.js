const isValidEmail = require("./validateEmail");
const isValidAge = require("./validateAge");

module.exports = ({ username, email, password, age }) => {
  isValidEmail(email);
  isValidUsername(username);
  isValidAge(age);
  isValidPassword(password);
};
