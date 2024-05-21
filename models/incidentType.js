const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incidentTypeSchema = new Schema(
  {
    eventType: {
      type: Schema.Types.ObjectId,
      ref: "EventType",
      required: true,
    },
    incident: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("IncidentType", incidentTypeSchema);
