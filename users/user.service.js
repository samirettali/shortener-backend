const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("helpers/db");
require("dotenv").config();
const User = db.User;

module.exports = {
  authenticate,
  getById,
  create,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    return {
      user: user.toJSON(),
      token: token,
    };
  }
}

async function create(userParam) {
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  await user.save();
}

async function getById(id) {
  return await User.findById(id);
}
