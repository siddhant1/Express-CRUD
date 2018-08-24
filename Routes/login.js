const mongoose = require("mongoose");
const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../Models/user");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("Invalid Email or password");
    return;
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    res.status(400).send("Invalid Email or password");
    return;
  }
  const token = user.generateAuthToken();
  res.send({ token });
});

function validate(user) {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  };
  return Joi.validate(user, schema);
}
module.exports = router;
