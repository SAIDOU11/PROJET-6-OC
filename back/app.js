const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const mongoose = require("./DB/mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Connexion DB
require("dotenv/config");

// Import Routes
const authRoute = require("./routes/auth");

//Middlewares & Routes
app
  .use(morgan("dev"))
  .use(express.json())
  .use(cors())
  .use(bodyParser.json())
  .use("/api/auth", authRoute);

// Export app
module.exports = app;
