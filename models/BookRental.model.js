const mongoose = require("mongoose");

// second, we need to define a model (it defines the relationship between our code and mongoDB)
const bookRentalSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  book: { type: mongoose.SchemaTypes.ObjectId, ref: "Book" },
  startDate: Date,
  returnDate: Date,
  returnStatus: Boolean,
});

const BookRental = mongoose.model("BookRental", bookRentalSchema);

module.exports = BookRental;
