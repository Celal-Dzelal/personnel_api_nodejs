"use strict";

const Personnel = require("../models/personnel");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Personnels']
            #swagger.summary = 'List Personnels'
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
            }
        */
    const result = await res.getModelList(Personnel);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Create Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */
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
    /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Get Single Personnel"
        */
    const result = await Personnel.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Update Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */
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
    /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Delete Personnel"
        */
    const result = await Personnel.findByIdAndDelete(req.params.id);
    res.status(result.deletedCount ? 204 : 404).send({
      error: true,
      message: "Data is not found or already deleted",
    });
  },
};
