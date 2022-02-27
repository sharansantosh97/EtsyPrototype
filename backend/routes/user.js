const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

router.route("/register").get(registerUser);

module.exports = router;