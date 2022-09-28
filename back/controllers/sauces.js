const router = require("express").Router();
const authenticateToken = require("./verifyToken");

const sauces = [];

router.get("/", authenticateToken, (req, res) => {
  res.json(sauces);
});

module.exports = router;
