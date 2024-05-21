const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    reportDate: {
      type: Date,
      required: true,
    },
    mediaUrl: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventType: {
      type: Schema.Types.ObjectId,
      ref: "EventType",
      required: true,
    },
    incidentType: {
      type: Schema.Types.ObjectId,
      ref: "IncidentType",
      required: true,
    },
    incidentTimeline: {
      type: Schema.Types.ObjectId,
      ref: "IncidentTimeline",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Event", eventSchema);
