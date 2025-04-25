"use strict";

const passwordEncrypt = require("../helpers/passwordEncrypt");
const Personnel = require("../models/personnel");
const Token = require("../models/token");

module.exports = {
  login: async (req, res) => {
    /* 
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with email/username and password'
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    username:'admin',
                    password:'1234'
                }
            }
        */

    const { username, email, password } = req.body;
    const identifier = username || email;
    if (!identifier || !password) {
      return res
        .status(400)
        .send({ error: true, message: "username/email and password required" }); //
    }
    const user = await Personnel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      password,
    });
    if (!user) {
      return res
        .status(401)
        .send({ error: true, message: "Wrong email/username or password" });
    }
    if (!user.isActive) {
      return res
        .status(403)
        .send({ error: true, message: "User is not active" });
    }
    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
      const newToken = passwordEncrypt(user._id + Date.now());
      tokenData = await Token.create({ userId: user._id, token: newToken });
    }
    return res.status(200).send({
      error: false,
      message: "Login Success",
      token: tokenData.token,
      user,
    });
  },
  logout: async (req, res) => {
    /*
   #swagger.tags = ["Authentication"]
   #swagger.summary = "Logout"
   #swagger.description = "Token Deleted"
   }
   */
    const token = req.user
      ? await Token.deleteOne({ userId: req.user._id })
      : null;
    res.status(200).send({
      error: false,
      messsage: token?.deletedCount
        ? "User token deleted. Logout Success."
        : "Logout Success",
    });
  },
};
