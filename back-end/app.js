// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const songsControllers = require("./controllers/songsControllers.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});
app.use("/songs", songsControllers);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
