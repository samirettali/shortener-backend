const mongoose = require("mongoose");
require("dotenv").config();

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect(process.env.MONGODB_URI, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model"),
  Url: require("../urls/url.model"),
};
