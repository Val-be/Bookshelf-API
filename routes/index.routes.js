const router = require("express").Router();
const bookshelf = require("./bookshelf.json");
const mongooseSetUp = require("./mongoose-setup.js");

router.get("/bookshelf", (req, res, next) => {
  res.status(200).json(bookshelf);
});

router.get("/bookshelf/filter", (req, res, next) => {
  const genre = req.query.genre;
  const author = req.query.author;
  const year = parseInt(req.query.year);
  const title = req.query.title;
  let filteredBooks = JSON.parse(JSON.stringify(bookshelf));
  if (genre) {
    filteredBooks = filteredBooks.filter((book) => {
      book.genres.includes(genre);
    });
  }
  if (author) {
    filteredBooks = filteredBooks.filter((book) => {
      if (book.author === author) {
        return true;
      }
      return false;
    });
  }
  if (year) {
    filteredBooks = filteredBooks.filter((book) => {
      if (parseInt(book.year) === parseInt(year)) {
        return true;
      }
      return false;
    });
  }
  if (title) {
    filteredBooks = filteredBooks.filter((book) => {
      if (book.title === title) {
        return true;
      }
      return false;
    });
  }
  res.status(200).json(filteredBooks);
});

router.post("/addBook", (req, res, next) => {
  const newBook = req.body;
  mongooseSetUp.createBook(
    newBook.title,
    newBook.author,
    newBook.year,
    newBook.genres
  );
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
