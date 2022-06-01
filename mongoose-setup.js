// first, we need the mongoose package
const mongoose = require("mongoose");

// second, we need to define a model (it defines the relationship between our code and mongoDB)
const bookSchema = new mongoose.Schema({
  title: { type: mongoose.SchemaTypes.String, required: true },
  author: mongoose.SchemaTypes.String,
  year: mongoose.SchemaTypes.Number,
  genres: [String],
});

const Book = mongoose.model("Bookshelf", bookSchema);

// third, we need to connect to mongoose
const MONGO_URI = "mongodb://127.0.0.1:27017/webdev-905";
// TODO: connect

function createBook(title, author, year, genres) {
  return Book.create({
    title: title,
    author: author,
    year: parseInt(year),
    genres: genres,
  });
}

async function executeDatabaseThings() {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${connection.connections[0].name}"`
    );
  } catch (err) {
    console.error(`Error connecting to mongo: ${MONGO_URI}.`, err);
    return;
  }
  // await createBook("Dune", "Frank Herbert", 1965, ["science-fiction"]);

  // const books = await Book.find();
  // console.log(books);
  return mongoose.connection.close();
}

executeDatabaseThings();

module.exports = mongooseSetup;
