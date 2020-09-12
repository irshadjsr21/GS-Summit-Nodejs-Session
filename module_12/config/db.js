const mongoose = require("mongoose");
const config = require("./index");

const db = config.DB.URL;
const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, connectionOptions);

    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
