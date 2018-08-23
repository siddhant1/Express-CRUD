const mongoose = require("mongoose");
const Joi = require("joi");
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    maxlength: 2048
  },
  user: {
    type: String,
    required: true
  }
});
const Item = mongoose.model("item", ItemSchema);
function validateItem(item) {
  const schema = {
    name: Joi.string()
      .required()
      .max(255),
    description: Joi.string()
      .required()
      .max(2048)
  };
  return Joi.validate(item, schema);
}
exports.Item = Item;
exports.validate = validateItem;
