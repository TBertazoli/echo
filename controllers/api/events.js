const Event = require("../../models/event");
const User = require("../../models/user");
const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  create,
  show,
  showOne,
  update,
  delete: deleteEvent,
  createTimeline,
  deleteTimeline,
  updateTimeline,
};

async function generateSignedUrls(image, eventId) {
  console.log(
    process.env.AWS_REGION,
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY,
    process.env.AWS_BUCKET_NAME
  );
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const filename = `${eventId}/${image}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    ContentType: "image/jpeg",
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return signedUrl;
}

async function create(req, res) {
  const user = await User.findById(req.user._id);
  const image = `${uuidv4()}.jpeg`;
  try {
    const event = await Event.create({
      ...req.body,
      mediaUrl: image,
      user: user,
    });
    let signedUrl;

    if (image) {
      signedUrl = await generateSignedUrls(image, event.id);
    }
    res.json({
      event,
      signedUrl,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function show(req, res) {
  const user = await User.findById(req.user._id);
  try {
    const event = await Event.find({ user: user }).populate({
      path: "eventType",
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

async function deleteEvent(req, res) {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);
    res.json(deleteEvent);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function createTimeline(req, res) {
  const event = await Event.findById(req.params.id);
  event.incidentTimeline.push(req.body);
  try {
    const incident = await event.save();
    res.json(incident);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteTimeline(req, res) {
  const event = await Event.findById(req.params.id);
  const timeline = event.incidentTimeline.findIndex(
    (t) => t.id === req.params.timelineId
  );
  event.incidentTimeline.splice(timeline, 1);

  try {
    const incident = await event.save();

    res.json(incident);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function updateTimeline(req, res) {
  const event = await Event.findById(req.params.id);
  const timeline = event.incidentTimeline.findIndex(
    (t) => t.id === req.params.timelineId
  );

  event.incidentTimeline[timeline] = req.body;

  try {
    const incident = await event.save();
    res.json(incident);
  } catch (err) {
    res.status(400).json(err);
  }
}
