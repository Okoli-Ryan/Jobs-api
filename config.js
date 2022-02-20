require("dotenv").config();

const secrets = {
  jwt_lifeTime: process.env.JWT_LIFETIME,
  jwt_secret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
};

module.exports = { secrets };
