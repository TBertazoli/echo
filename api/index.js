const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const passport = require("passport");

require("dotenv").config();
require("./config/database");
require("./config/passport");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use(passport.initialize());
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

app.use("/api/users", require("./routes/api/users"));
app.use("/api/user/events", require("./routes/api/events"));
app.use("/api/events", require("./routes/api/allEvents"));
app.use("/api/eventtype", require("./routes/api/eventType"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
