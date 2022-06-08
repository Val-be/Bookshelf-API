const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Book = require("../models/Book.model");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin.js");

// //Find all books
// router.get("/books", async (req, res, next) => {
//   try {
//     const allBooks = await Book.find();
//     res.status(200).json(allBooks);
//   } catch (error) {
//     res.status(500).send("Internal error");
//   }
// });

//Find book by id
router.get("/books/:id", async (req, res, next) => {
  try {
    const foundBook = await Book.findById(req.params.id);
    res.status(200).json(foundBook);
  } catch (error) {
    res.status(404).send("No matching id");
  }
});

//Find books by filter
router.get("/books", async (req, res, next) => {
  try {
    console.log(req.query);
    const foundBooks = await Book.find({
      title: req.query.title || { $exists: 1 },
      author: req.query.author || { $exists: 1 },
      genres: {
        $in: req.query.genres,
      },
    });
    res.status(200).json(foundBooks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal error");
  }
});

//Create new book
router.post(
  "/books/create",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json(newBook);
    } catch (error) {}
  }
);

//Update book
router.post(
  "/books/update/:id",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Book updated successfuly.", updatedBook });
    } catch (error) {
      res.status(404).json({ message: "Couldn't find book by id." });
    }
  }
);

//Delete book
router.delete(
  "/books/delete/:id",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const foundBook = await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Deleted book successfuly.", foundBook });
    } catch (error) {
      res.status(404).json({ message: "Couldn't find book by id." });
    }
  }
);

module.exports = router;
