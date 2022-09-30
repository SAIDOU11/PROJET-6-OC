const express = require("express");
const cors = require("cors");
const mongoose = require("./DB/mongoose");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
const path = require("path");

const bodyParser = require("body-parser");

// Connexion DB
require("dotenv/config");

// Import Routes
const authRoute = require("./routes/auth");
const saucesRoute = require("./routes/sauces");

//Middlewares & Routes Middlewares
app
  .use(morgan("dev"))
  .use(express.json())
  .use(cors())
  .use(bodyParser.json())
  .use("/api/auth", authRoute)
  .use("/api/sauces", saucesRoute)
  .use("/images", express.static(path.join(__dirname, "images")));

// Export app
module.exports = app;
