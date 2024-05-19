const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportTypeSchema = new Schema(
  {
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReportType", reportTypeSchema);
