require("rootpath")();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("helpers/jwt");
const bodyParser = require("body-parser");
const errorHandler = require("helpers/error-handler");

require("dotenv").config();

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var corsOptions = {
  origin: "*",
};

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(jwt());

app.use(
  process.env.BASE_URL + "/users",
  cors(corsOptions),
  require("./users/users.controller")
);
app.use(
  process.env.BASE_URL + "/urls",
  cors(corsOptions),
  require("./urls/urls.controller")
);
app.use(errorHandler);

const port =
  process.env.PORT ? process.env.PORT : 3000;

app.listen(port, function () {
  console.log("Server listening on port " + port);
});
