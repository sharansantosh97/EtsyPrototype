const express = require("express");
const router = express.Router();
const { registerUser, updateUser } = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/update").post(updateUser);

module.exports = router;
//routes