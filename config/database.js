require("dotenv").config();
const url = process.env.DATABASE_URL;

const mongoose = require("mongoose");

async function connectDB() {
  return mongoose.connect(url);
}

module.exports = { connectDB };
