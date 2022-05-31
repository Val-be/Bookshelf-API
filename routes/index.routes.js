const router = require("express").Router();
const bookshelf = require("./bookshelf.json");

router.get("/bookshelf", (req, res, next) => {
  res.status(200).json(bookshelf);
});

router.get("/bookshelf/filter", (req, res, next) => {
  const genra = req.query.genra;
  const author = req.query.author;
  const year = parseInt(req.query.year);
  const title = req.query.title;
  let filteredBooks = JSON.parse(JSON.stringify(bookshelf));
  if (genra) {
    filteredBooks = filteredBooks.filter((book) => {
      if (book.genra === genra) {
        return true;
      }
      return false;
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

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
