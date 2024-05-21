const Event = require("../../models/event");

module.exports = {
  show,
  showOne,
};

async function show(req, res) {
  try {
    const events = await Event.find({});

    console.log(events);
    res.json(events);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function showOne(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(400).json(err);
  }
}
