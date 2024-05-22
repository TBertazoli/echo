const Event = require("../../models/event");
const User = require("../../models/user");
const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports = {
  create,
  show,
  showOne,
  update,
  delete: deleteReport,
  createTimeline,
};

async function generateSignedUrls(image, eventId) {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  console.log(s3);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${eventId}/${image.filename}`,
    Body: image.data,
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return signedUrl;
}

async function create(req, res) {
  const user = await User.findById(req.user._id);
  const images = req.body.mediaUrl;
  console.log(user);
  console.log(images);
  let uploadedImages;
  if (images) {
    uploadedImages = await generateSignedUrls(images, req.body._id);
  }

  try {
    const event = await Event.create({
      ...req.body,
      user: user,
      mediaUrl: uploadedImages,
    });
    console.log(event);
    res.json(event);
  } catch (err) {
    console.log(err);
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
    const event = await Event.findById(req.params.id).populate({
      path: "eventType",
      model: "EventType",
    });
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

async function createTimeline(req, res) {
  const event = await Event.findById(req.params.id);
  console.log(event);
  event.incidentTimeline.push(req.body);
  let incident;
  try {
    incident = await event.save();
    res.json(incident);
  } catch (err) {
    res.status(400).json(err);
  }
}
