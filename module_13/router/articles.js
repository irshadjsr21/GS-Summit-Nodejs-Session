const express = require("express");
const controller = require("../controller/articles");
const validator = require("../validators/article");

const router = express.Router();

router.get("/", controller.getArticles);
router.post("/", validator.addArticle, controller.addArticle);

module.exports = router;
