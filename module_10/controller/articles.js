const Article = require("../models/Article");

module.exports = {
  getArticles: async (req, res) => {
    try {
      let { page = 1, itemsPerPage = 10 } = req.query;

      page = parseInt(page, 10);
      itemsPerPage = parseInt(itemsPerPage, 10);

      const articles = await Article.find({})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const count = await Article.countDocuments({});

      const lastPage = Math.ceil(count / itemsPerPage);
      res.json({
        data: articles,
        page,
        itemsPerPage,
        lastPage,
        itemCount: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  addArticle: async (req, res) => {
    try {
      const { name, content } = req.body;

      if (!name) {
        res.status(400).json({ message: "Please enter the article name." });
        return;
      }
      if (!content) {
        res.status(400).json({ message: "Please enter the article content." });
        return;
      }

      const article = await Article.create({ name, content });
      res
        .status(201)
        .json({ message: "Article added successfully.", data: article });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};
