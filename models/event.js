const mongoose = require("mongoose");
// const incidentTimeline = require("./incidentTimeline");
const Schema = mongoose.Schema;

require("./eventType");

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
    mediaUrl: [
      {
        type: String,
      },
    ],
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

    incidentTimeline: [incidentTimelineSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
