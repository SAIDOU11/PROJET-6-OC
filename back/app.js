// Import Express
const express = require("express");
const app = express();

// Import & Connexion DB
const mongoose = require("./DB/mongoose");
require("dotenv/config");

//Import Morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// Import bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Export app
module.exports = app;
