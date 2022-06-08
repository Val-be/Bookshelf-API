const User = require("../models/User.model");
const jsonwebtoken = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin.js");
const router = require("express").Router();

router.get("/users", async (req, res, next) => {
  try {
    const username = req.params;
    const foundUser = await User.find({ username });
    res.status(200).json({ message: "Found user:", foundUser });
  } catch (error) {
    res.status(404).json({ message: "Could not find user by this username." });
  }
});

router.post("users/update", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const updatedUser = User.findByIdAndUpdate(userId, req.body, { new: true });
  } catch (error) {}
});
