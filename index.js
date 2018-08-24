//BASIC SETUP AND IMPORTS
require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const user = require("./Routes/user");
const login = require("./Routes/login");
const item = require("./Routes/item");
//Middlewares
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.noCache());
app.use(morgan("tiny"));
//Check Environment Variables
if (!process.env.JWTKEY) {
  console.log("Set the private jwt key as shown in .env-example");
  process.exit(1);
}
//mongoose connect
mongoose
  .connect("mongodb://localhost:27017/CRUD")
  .then(() => console.log("Connected to mongodb"))
  .catch(err => console.log(err));
//ROUTE HANDLERS
app.use("/api/user", user);
app.use("/api/login", login);
app.use("/api/item", item);

//Listen to server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port" + PORT);
});
