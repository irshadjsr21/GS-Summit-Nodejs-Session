const express = require("express");
const controller = require("../controller/articles");

const router = express.Router();

router.get("/", controller.getArticles);
router.post("/", controller.addArticle);

module.exports = router;
