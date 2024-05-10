const moongose = require("mongoose");

moongose.connect(process.env.DATABASE_URL);

const db = moongose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
