const EventType = require("../../models/eventType");

module.exports = {
  eventTypeList,
};

async function eventTypeList(req, res) {
  const EventTypes = await EventType.find();
  res.status(200).json(EventTypes);
}
