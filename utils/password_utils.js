// utils/passwordUtils.js - Password encryption using bcrypt

const bcrypt = require('bcrypt');

const saltRounds = 10; // Number of salt rounds for bcrypt

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePasswords = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = { hashPassword, comparePasswords };
