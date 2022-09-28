const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, max: 255, min: 6 },
  password: { type: String, required: true, max: 1024, min: 6 },
});

userSchema.plugin(uniquevalidator);

module.exports = mongoose.model("User", userSchema);
