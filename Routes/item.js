const router = require("express").Router();
const { Item, validate } = require("../Models/item");
const { User } = require("../Models/user");
const auth = require("../middlewares/auth");

//GET CODE BLOCK
router.get("/", auth, async (req, res) => {
  const items = await Item.find({ user: req.user._id });
  res.send(items);
});

//POST CODE BLOCK
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    user: req.user._id
  });
  item.save();
  res.send(item);
});

//PUT CODE BLOCK
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        user: req.user._id
      }
    },
    { new: true }
  );
  if (!item) {
    res.status(404).send("The Item with the given id is not found");
    return;
  }
  res.send(item);
});
//DELETE CODE BLOCK
router.delete ("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const item = await Item.findOneAndRemove(req.params.id);
  if (!item) {
    res.status(404).send("ITEM NOT FOUND");
    return;
  }
  res.send(item);
});
module.exports = router;
