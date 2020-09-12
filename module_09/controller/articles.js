const articleList = [
  "Learn Javascript Basics",
  "Working with Flutter for Web developers",
  "Learning path to become a Full Stack Developer",
];

module.exports = {
  getArticles: (req, res) => {
    res.json({
      data: articleList,
    });
  },

  addArticle: (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Please enter the article name." });
      return;
    }

    articleList.push(name);
    res.status(201).json({ message: "Article added successfully." });
  },
};
