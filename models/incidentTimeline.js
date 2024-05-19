const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incidentTimelineSchema = new Schema(
  {
    notes: { type: String, required: true },
    time: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("IncidentTimeline", incidentTimelineSchema);
