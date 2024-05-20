const express = require("express");
const router = express.Router();
const allReportsCtrl = require("../../controllers/api/allReports");

router.get("/", allReportsCtrl.show);
router.get("/:id", allReportsCtrl.showOne);

module.exports = router;
