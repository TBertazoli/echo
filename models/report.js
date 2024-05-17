const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
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
    reportType: {
      type: Schema.Types.ObjectId,
      ref: "ReportType",
      required: true,
    },
    incidentType: {
      type: Schema.Types.ObjectId,
      ref: "IncidentType",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Report", reportSchema);
