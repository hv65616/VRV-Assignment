const express = require("express");
const registerController = require("../controller/authController");
const loginController = require("../controller/authController");
const logoutController = require("../controller/authController")
const router = express.Router();

router.post("/register", registerController.registerController);
router.post("/login", loginController.loginController);
router.get("/logout",logoutController.logoutController);

module.exports = router;
