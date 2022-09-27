const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { userValidation, loginValidation } = require("../routes/validation");

router.post("/signup", async (req, res) => {
  // Validate data before making a user
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is the DataBase
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(403).json({ message: "Email already exists" });
  } else {
    res.status(201).json({ message: "Utilisateur créé" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error }));
});

router.post("/login", async (req, res) => {
  // Validate data before making a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  // Check if the email exist
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Login/Password incorrect" });
      }

      // Correct password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Login/Password incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
