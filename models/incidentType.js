const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incidentTypeSchema = new Schema(
  {
    incident: { type: String, required: true },
    reportType: {
      type: Schema.Types.ObjectId,
      ref: "ReportType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("IncidentType", incidentTypeSchema);
