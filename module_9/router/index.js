const express = require("express");
const controller = require("../controller/index");
const userRouter = require("./users");
const articleRouter = require("./articles");

const router = express.Router();

router.get("/", controller.getIndex);
router.use("/users", userRouter);
router.use("/articles", articleRouter);

module.exports = router;
