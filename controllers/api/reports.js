const Report = require("../../models/report");
const User = require("../../models/user");

module.exports = {
  create,
  // show,
  // showOne,
  // update,
  // delete: deleteOne,
};

async function create(req, res) {
  const user = await User.findById(req.user._id);

  try {
    const report = await Report.create(req.body);
    user.report.push(req.body);
    console.log(report);
    res.json(report);
  } catch (err) {
    res.status(400).json(err);
  }
}
