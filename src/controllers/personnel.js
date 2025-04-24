"use strict";

const Personnel = require("../models/personnel");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Personnel);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
  create: async (req, res) => {
    const isLead = req.body?.isLead || false;

    if (isLead) {
      await Personnel.updateMany(
        {
          departmentId: req.body.departmentId,
          isLead: true,
        },
        { isLead: false }
      ).then(() => console.log("Personnels Updated"));
    }

    const result = await Personnel.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    const result = await Personnel.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const isLead = req.body?.isLead || false;

    if (isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );
      await Personnel.updateMany(
        { departmentId, isLead: true },
        { isLead: false }
      ).then(() => console.log("Personnels Updated"));
    }

    const result = await Personnel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(202).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    const result = await Personnel.findByIdAndDelete(req.params.id);
    res.status(result.deletedCount ? 204 : 404).send({
      error: true,
      message: "Data is not found or already deleted",
    });
  },
};
