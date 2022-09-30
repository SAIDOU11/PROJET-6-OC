const router = require("express").Router();
const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce saved !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });

  // delete req.body._id;
  // // Create sauces
  // const sauce = new Sauce({
  //   ...req.body,
  // });
  // sauce
  //   .save()
  //   .then(() => res.status(201).json({ message: "Sauce saved!" }))
  //   .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  // Check if user is okay
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce updated!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
  // Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  //   .then(() => res.status(200).json({ message: "Sauce Updated ! " }))
  //   .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  // Sauce.deleteOne({ _id: req.params.id })
  //   .then(() => res.status(200).json({ message: "Sauce deleted ! " }))
  //   .catch((error) => res.status(400).json({ error }));Thing.findOne({ _id: req.params.id})

  // Check if user is okay
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      }
      // Delete sauce form DB & image from filename
      else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce deleted !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res) => {
  // Retourne toutes les sauces renvoyer par la DB
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
