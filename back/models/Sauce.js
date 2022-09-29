const mongoose = require("mongoose");

const saucesSchema = new mongoose.Schema([
  {
    userId: { type: String },
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String },
    heat: { type: Number, min: 1, max: 10 },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }],
  },
]);

module.exports = mongoose.model("Sauce", saucesSchema);
