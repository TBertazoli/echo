const express = require("express");
const router = express.Router();
const reportsCtrl = require("../../controllers/api/reports");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", reportsCtrl.create);
router.get("/", reportsCtrl.show);
router.get("/:id", reportsCtrl.showOne);
router.put("/:id", reportsCtrl.update);
router.delete("/:id", reportsCtrl.delete);

module.exports = router;