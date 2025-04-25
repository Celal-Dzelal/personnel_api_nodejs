"use strict";

const Department = require("../models/department");
const Personnel = require("../models/personnel");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Departments']
            #swagger.summary = 'List Departments'
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
    const result = await res.getModelList(Department);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Department),
      result,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Create Department"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department'
                }
            }
        */
    const result = await Department.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Get Single Department"
        */
    const result = await Department.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Update Department"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department'
                }
            }
        */
    const result = await Department.findByIdAndUpdate(req.params.id, req.body);
    res.status(202).send({
      error: false,
      result,
      updated: await Department.findById(req.params.id),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Delete Department"
        */
    const result = await Department.findByIdAndDelete(req.params.id);
    res.status(result.deletedCount ? 204 : 404).send({
      error: true,
      message: "Data is not found or already deleted",
    });
  },
  personnels: async (req, res) => {
    /* 
                #swagger.tags = ['Departments']
                #swagger.summary = 'List Personnels of Department'
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
    const { id: departmentId } = req.params;
    const result = await res.getModelList(Personnel, { departmentId });
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
};
