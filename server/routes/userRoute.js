const express = require("express");
const router = express.Router();

const {
  adminLogin,
  createUser
} = require("../controllers/userController");

const { adminAuth } = require("../middleware/authMiddleware");


// admin login
router.post("/admin/login", adminLogin);


// create user
router.post("/create", createUser);


// ADMIN ONLY ROUTE
router.get("/admin/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;