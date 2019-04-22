// npm run server to start

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo using Mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/items", items);
// anything that goes to api/items should refer to the items variable
// ... which is the file containing our routes

const port = process.env.PORT || 3001;
// need process.env for deploying to heroku

app.listen(port, () => console.log(`Server started on port ${port}`));
