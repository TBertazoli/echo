const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const passport = require("passport");

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post("/", usersCtrl.create);

// POST /api/users/login
router.post("/login", usersCtrl.login);
// GET /api/users/check-token
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

//google oauth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = router;
