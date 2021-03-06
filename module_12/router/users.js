const express = require("express");
const controller = require("../controller/users");
const validator = require("../validators/user");

const router = express.Router();

router.get("/", controller.getUsers);
router.post("/", validator.addUser, controller.addUser);
router.post("/login", validator.loginUser, controller.loginUser);

module.exports = router;
