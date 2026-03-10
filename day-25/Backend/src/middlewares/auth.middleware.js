const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache")

async function authUser(req, res, next) {
  token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const isTokenBlacklisted = await redis.get(token)

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }
  

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }
}

module.exports = authUser;
