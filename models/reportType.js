const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportTypeSchema = new Schema(
  {
    reportType: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("ReportType", reportTypeSchema);
