const router = require("express").Router();
const bodyParser = require("body-parser");
const Sauce = require("../models/Sauce");
const authenticateToken = require("./verifyToken");

router.post("/", authenticateToken, (req, res, next) => {
  delete req.body._id;
  // Create sauces
  const sauce = new Sauce({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce saved!" }))
    .catch((error) => res.status(400).json({ error }));
});

router.put("/", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce Updated ! " }))
    .catch((error) => res.status(400).json({ error }));
});

router.get("/:id", (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
});

router.get("/", (req, res) => {
  // Retourne toutes les sauces renvoyer par la DB
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
