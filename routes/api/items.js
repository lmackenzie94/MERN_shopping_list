const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route POST api/items
// @desc Create an Item
// @access Public

// the '/' below actually refers to the route api/items/ because of how our server.js file is set up
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
    // dont need to add Date field here because that'll be automatically added
  });

  newItem.save().then(item => res.json(item)); // saves to database
});

// https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
// go to 28 min to see how to test POST in postman
// after doing a POST request, check Collections in MongoDB online

// @route GET api/items
// @desc Get ALL Items
// @access Public

// the '/' below actually refers to the route api/items/ because of how our server.js file is set up
router.get("/", (req, res) => {
  Item.find() // returns a promise
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route DELETE api/items/:id (note the added id part)
// @desc Delete an Item
// @access Public

// the '/' below actually refers to the route api/items/ because of how our server.js file is set up
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove())
    .then(() => res.json({ success: true })) //response can be anything
    .catch(err => res.status(404).json({ success: false }));
});

// in Postman, DELETE: http://localhost:3001/api/items/<Item ID from database>

module.exports = router;

// NOTE: to test APIs, need to use a HTTP client (ex. Postman)
