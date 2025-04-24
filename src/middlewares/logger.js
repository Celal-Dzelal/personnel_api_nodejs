"use strict";

const morgan = require("morgan");

const customLog =
  "TIME=':date[iso]' - URL=':url' - METHOD=':method' - IP=':remote-addr' - STATUS=':status' - SIGN=':user-agent' - (:response-time[digist] ms)";
const fs = require("node:fs");
const now = new Date();
const today = now.toISOString().split("T")[0];
console.log(today);
module.exports = morgan(customLog, {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});
