const Event = require("../../models/event");

module.exports = {
  show,
  showOne,
};

async function show(req, res) {
  try {
    const events = await Event.find()
      .populate({
        path: "eventType",
        model: "EventType",
      })

      .catch((err) => {
        console.log(err);
      });
    res.json(events);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function showOne(req, res) {
  try {
    const event = await Event.findById(req.params.id).populate({
      path: "eventType",
      model: "EventType",
    });
    res.json(event);
  } catch (err) {
    res.status(400).json(err);
  }
}
