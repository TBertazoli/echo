const express = require("express");
const router = express.Router();
const eventTypeCtrl = require("../../controllers/api/eventType");

router.get("/", eventTypeCtrl.eventTypeList);

module.exports = router;
