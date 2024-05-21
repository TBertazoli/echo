const Report = require("../../models/report");

module.exports = {
  show,
  showOne,
};

async function show(req, res) {
  try {
    const reports = await Report.find({})..populate("reportType");
      //   populate("user");
      

    console.log(reports);
    res.json(reports);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function showOne(req, res) {
  try {
    const report = await Report.findById(req.params.id);
    res.json(report);
  } catch (err) {
    res.status(400).json(err);
  }
}
