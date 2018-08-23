const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    maxlength: 1024,
    required: true
  }
});
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this.id }, process.env.JWTKEY);
};
const User = mongoose.model("user", UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .max(255)
      .required(),
    email: Joi.string()
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
