const express = require("express");
const router = require("./router/index");
const connectDB = require("./config/db");
const addUser = require("./middleware/addUser");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(addUser);
app.use(router);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found." });
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server has started on port 3000");
  });
});
