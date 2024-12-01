const express = require("express");
const router = express.Router();
const verifytoken = require("../middleware/authMiddleware");
const authorizedRole = require("../middleware/roleMiddleware");
router.get("/admin", verifytoken, authorizedRole("admin"), (req, res) => {
  res.json({ message: "Welcome admin" });
});
router.get(
  "/manager",
  verifytoken,
  authorizedRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome manager" });
  }
);
router.get(
  "/user",
  verifytoken,
  authorizedRole("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome user" });
  }
);

module.exports = router;
