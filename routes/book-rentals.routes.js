const isAuthenticated = require("../middleware/isAuthenticated");
const BookRental = require("../models/BookRental.model");
const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin.js");

router.post(
  `/book-rental/create`,
  isAuthenticated,
  async (req, res, next) => {}
);
