const express = require("express");
const controller = require("../controller/users");

const router = express.Router();

router.get("/", controller.getUsers);
router.post("/", controller.addUser);
router.post("/login", controller.loginUser);

module.exports = router;
