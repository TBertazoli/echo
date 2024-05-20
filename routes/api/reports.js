const express = require("express");
const router = express.Router();
const reportsCtrl = require("../../controllers/api/reports");

// routes user specific
router.post("/", reportsCtrl.create); // create a report
router.get("/", reportsCtrl.show); //to show only user reports
router.get("/:id", reportsCtrl.showOne); //to show only users report by id
router.put("/:id", reportsCtrl.update); //
router.delete("/:id", reportsCtrl.delete);

module.exports = router;
