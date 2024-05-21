const Event = require("../../models/event");
const User = require("../../models/user");
const AWS = require("aws-sdk");
const fs = require("fs");

module.exports = {
  create,
  show,
  showOne,
  update,
  delete: deleteReport,
};

async function create(req, res) {
  const user = await User.findById(req.user._id);

  try {
    const event = await Event.create({
      ...req.body,
      user: user,
      photo: req.file ? req.file.path : null,
    });

    res.json(event);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const user = await User.findById(req.user._id);
    const event = await Event.find({ user: user }).populate({
      path: "eventType",
      model: "EventType",
    });

    res.json(event);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function showOne(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updateEvent);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteReport(req, res) {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);
    res.json(deleteEvent);
  } catch (err) {
    res.status(400).json(err);
  }
}

// async function addMedia(req, res) {
//   AWS.config.update({
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   });
//   const s3 = new AWS.S3();

//   try {
//     const event = await Event.findById(req.params.id);
//     const fileContent = fs.readFileSync(event.mediaUrl);

//     await event.save();
//     res.json(event);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }
