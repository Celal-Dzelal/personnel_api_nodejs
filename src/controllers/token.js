"use strict";

const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Token);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      result,
    });
  },
  create: async (req, res) => {
    const result = await Token.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    const result = await Token.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  deleteToken: async (req, res) => {
    const result = await Token.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(204).end();
    }
    return res.status(404).send({
      error: true,
      message: "Data is not found or already deleted",
    });
  },
};
