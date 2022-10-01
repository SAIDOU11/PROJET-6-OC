const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { userValidation, loginValidation } = require("../routes/validation");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  // Validate data before making a user
  const { error } = userValidation(req.body);
  if (error) return res.status(403).json({ error });

  // Hash password
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User Created ! !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  // Create and assign a token
  const token = jwt.sign({ _id: req.body._id }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  res.header("login-token", token);

  // Validate data before making a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(403).json({ error });

  // Check if the email exist
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({ message: "Login/Password incorrect" });

      // Correct password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Password/Login incorrect" });
          }

          res.status(200).json({
            message: "User logged in !",
            userId: user._id,
            token,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
