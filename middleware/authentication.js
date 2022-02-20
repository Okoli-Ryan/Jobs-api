const User = require("../models/User");
const { secrets } = require("../config");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("Authentication invalid");

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, secrets.jwt_secret);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = { auth };
