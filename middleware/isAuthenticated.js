const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User.model");

async function isAuthenticated(req, res, next) {
  const authorization = res.headers.authorization;
  console.log({ authorization });

  if (!authorization) {
    res.status(401).jspn({ message: "Unauthorized access. Please log in." });
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decodedToken = jsonwebtoken.verify(token, process.env.TOKEN_SECRETà);
    console.log({ decodedToken });

    const { username } = decodedToken;

    const user = await User.findOne({ username });

    req.user = user;
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
    return;
  }
}

module.exports = isAuthenticated;
