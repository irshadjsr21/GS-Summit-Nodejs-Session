const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
