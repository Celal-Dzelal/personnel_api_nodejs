"use strict";

const {
  crypto, //* Encrypt module of Node.js
  //* crypto.pbkdf2Sync() function's parameters
  SECRET_KEY: keyCode, //* Secret key for encryption
  LOOP_COUNT: loopCount, //* How many repeat
  CHAR_COUNT: charCount, //* Hash length
  ENC_TYPE: encType, //* Algorithm Type
} = {
  crypto: require("node:crypto"),
  ...process.env,
};

const loopCountNum = Number(loopCount); //* Translate repeat number to number
const charCountNum = Number(charCount); //* Translate hash length to number

module.exports = (password) => {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCountNum, charCountNum, encType)
    .toString("hex");
};
