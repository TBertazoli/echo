const Report = require("../../models/report");
const User = require("../../models/user");

module.exports = {
  create,
  show,
  showOne,
  update,
  delete: deleteReport,
};

async function create(req, res) {
  const user = await User.findById(req.user._id);
  //   const user = "6647d4203cecb94f41d48749";
  console.log(user);

  try {
    const report = await Report.create(req.body);
    user.report.push(req.body);
    console.log(report);
    res.json(report);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const user = await User.findById(req.user._id);
    // const user = "6647d4203cecb94f41d48749";
    const reports = await Report.find({ user: user });
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

async function update(req, res) {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteReport(req, res) {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    res.json(deletedReport);
  } catch (err) {
    res.status(400).json(err);
  }
}