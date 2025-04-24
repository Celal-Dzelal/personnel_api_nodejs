"use strict";

const Department = require("../models/department");
const Personnel = require("../models/personnel");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Department);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Department),
      result,
    });
  },
  create: async (req, res) => {
    const result = await Department.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    const result = await Department.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Department.findByIdAndUpdate(req.params.id, req.body);
    res.status(202).send({
      error: false,
      result,
      updated: await Department.findById(req.params.id),
    });
  },
  delete: async (req, res) => {
    const result = await Department.findByIdAndDelete(req.params.id);
    res.status(result.deletedCount ? 204 : 404).send({
      error: true,
      message: "Data is not found or already deleted",
    });
  },
  personnels: async (req, res) => {
    const { id: departmentId } = req.params;
    const result = await res.getModelList(Personnel, { departmentId });
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
};
