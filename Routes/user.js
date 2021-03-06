const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const { User, validate } = require("../Models/user");
const router = require("express").Router();
const _ = require("lodash");
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(404).send("The User is already registered with us");
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  req.body.password = password;
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  await user.save();
  res.send(_.pick(user, ["name", "email", "_id"]));
});
module.exports = router;
