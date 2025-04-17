const express = require("express");
const router = express.Router();
const allEventsCtrl = require("../../controllers/api/allEvents");

router.get("/", allEventsCtrl.show);
router.get("/:id", allEventsCtrl.showOne);

module.exports = router;
