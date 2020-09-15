const expressJwt = require("express-jwt");
const userService = require("../users/user.service");
const { pathToRegexp } = require("path-to-regexp");
require("dotenv").config();

module.exports = jwt;

function jwt() {
  const secret = process.env.SECRET;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      process.env.BASE_URL + "/users/authenticate",
      process.env.BASE_URL + "/users/register",
      pathToRegexp(process.env.BASE_URL + "/urls/:id"),
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);
  if (!user) {
    return done(null, true);
  }
  done();
}
