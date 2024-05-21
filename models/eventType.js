const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventTypeSchema = new Schema(
  {
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventType", eventTypeSchema);
