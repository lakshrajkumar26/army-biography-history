const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.adminAuth = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};