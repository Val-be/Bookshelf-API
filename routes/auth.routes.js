const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jsonwebtoken = require("jsonwebtoken");
const router = require("express").Router();
const saltRounds = 12;

//Signup form
router.get("/signup", async (req, res, next) => {
  const root = __dirname.replace("routes", "");
  console.log(root);
  res.sendFile("views/auth/signup.html", { root });
});

//Signup request
router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, passwordConfirmation } = req.body;
    const foundUsername = await User.find({ username });
    if (foundUsername) {
      res.status(409).json({
        message:
          "Username already exists. Try a different one or go to log in if it's yours.",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: "Please enter a valid password." });
      return;
    }

    if (password !== passwordConfirmation) {
      res.status(400).json({
        message: "Password confirmation does not match. Please try again.",
      });
      return;
    }

    const salt = bcrypt.genSalt(saltRounds);
    const hashedPassword = bcrypt.hash(password, salt);

    const createdUser = await User.create({
      username,
      password: hashedPassword,
      isLoggedIn: false,
    });

    res
      .status(201)
      .json({ message: "Created account successfuly." }, createdUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Login request
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  const matchingUser = await User.findOne({ username });

  if (!matchingUser) {
    res
      .status(404)
      .json({ message: "No matching user, please enter a valid username." });
    return;
  }

  const passwordMatch = bcrypt.compare(password, matchingUser.password);

  if (passwordMatch) {
    res.status(200).json({
      message: `Welcome back ${matchingUser.username}!`,
      isLoggedIn: true,
    });
    matchingUser.isLoggedIn = true;
    const payload = { username };

    const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  } else {
    res.status(401).json({ message: "Wrong password. Please try again." });
  }
});

//Verify token
router.get("/verify", async (req, res, next) => {
  // Verify the bearer token is still valid
  // get the bearer token from the header
  const { authorization } = req.headers;

  // isolate the jwt
  const token = authorization.replace("Bearer ", "");
  console.log({ token });

  try {
    // verify the jwt with the jsonwebtoken package
    const payload = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    console.log({ payload });

    // send the user the payload
    res.json({ token, payload });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
