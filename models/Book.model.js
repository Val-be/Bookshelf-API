const mongoose = require("mongoose");

// second, we need to define a model (it defines the relationship between our code and mongoDB)
const bookSchema = new mongoose.Schema({
  title: { type: mongoose.SchemaTypes.String, required: true },
  author: mongoose.SchemaTypes.String,
  rating: mongoose.SchemaTypes.Number,
  genres: [String],
  description: String,
  publisher: String,
  page_count: Number,
  published_day: Number,
  published_month: String,
  published_year: Number,
});

const Book = mongoose.model("Bookshelf", bookSchema, "Bookshelf");

module.exports = Book;
