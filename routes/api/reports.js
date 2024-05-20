const express = require("express");
const router = express.Router();
const reportsCtrl = require("../../controllers/api/reports");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/account", reportsCtrl.create); // create a report
router.get("/account", reportsCtrl.show); //to show only user reports
// router.get("/account/:id", reportsCtrl.showOne); to show only users report by id
router.put("/account/:id", reportsCtrl.update);
router.delete("/account/:id", reportsCtrl.delete);

module.exports = router;
