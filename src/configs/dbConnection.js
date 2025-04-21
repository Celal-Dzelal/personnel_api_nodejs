const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURI || "mongodb://localhost:27017/personnelAPI")
  .then(() => console.log("**DB CONNECTED**"))
  .catch(() => console.log("!! DB NOT CONNECTED !!"));

module.exports = mongoose;
