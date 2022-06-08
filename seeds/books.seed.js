const Book = require("../models/Book.model.js");
const openConnection = require("../db/connect.js");
const rawBooks = require("./books.json");
const { default: mongoose } = require("mongoose");

// convert from their format to your format
function convertRawBooksToSchema({ published_date, generes, ...fields }) {
  const [published_month, published_day, published_year] =
    separateDate(published_date);
  const genres = separateGeneres(generes);
  return {
    ...fields,
    genres,
    published_day,
    published_month,
    published_year,
  };
}

function separateDate(str) {
  return str.replace(",", "").split(" ");
}

function separateGeneres(str) {
  return str
    .replace("&amp", "")
    .split(",")
    .map((x) => x.trim());
}

async function seedBooks() {
  await openConnection();
  const convertedBooks = rawBooks.map(convertRawBooksToSchema);

  const createdBooks = await Book.create(convertedBooks);
  console.log(`Created ${createdBooks.length} Books.`);
  await mongoose.connection.close();
  console.log("Connection closed.");
}

seedBooks();
