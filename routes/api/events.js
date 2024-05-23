const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/api/events");

// routes user specific
router.post("/", eventsCtrl.create); // create a report
router.get("/", eventsCtrl.show); //to show only user reports
router.get("/:id", eventsCtrl.showOne); //to show only users report by id
router.put("/:id", eventsCtrl.update); //
router.delete("/:id", eventsCtrl.delete);
router.post("/:id/timeline", eventsCtrl.createTimeline);
router.put("/:id/timeline/:timelineId", eventsCtrl.updateTimeline);
router.delete("/:id/timeline/:timelineId", eventsCtrl.deleteTimeline);
module.exports = router;
