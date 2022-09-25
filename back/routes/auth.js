const router = require("express").Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  res.send("ok");
  //   try {
  //     const savedUser = await user.save();
  //     res.send("ok"); //user: user._id
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
});

router.post("/login", async (req, res) => {
  console.log("signup request :", req.body);
  res.send({ message: "Utilisateur connecté" });
});

module.exports = router;
