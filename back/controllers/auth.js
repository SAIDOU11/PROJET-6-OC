const router = require("express").Router();
const User = require("../models/User");
const { success } = require("../helper");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const message = "Utilisateur connecté";

  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE NEW USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  user
    .save()
    .then(res.json(success(message, user)))
    .catch((error) => res.json({ error }));
});

router.post("/login", async (req, res) => {
  const message = "Utilisateur connecté";
  // CHECKING IF THE EMAIL EXISTS
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email is incorrect" });

  // PASSWORD CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Password is incorrect" });

  res.json(success(message));
});

module.exports = router;
