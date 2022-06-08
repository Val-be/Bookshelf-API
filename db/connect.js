const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/webdev-905";

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
}

module.exports = executeDatabaseThings;
