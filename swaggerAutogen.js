"use strict";

// npm i swagger-autogen

const swaggerAutogen = require("swagger-autogen")();
const packageJson = require("./package.json");
require("dotenv").config();

const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || "8000";

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,
    contact: { name: packageJson.author, email: packageJson.contact },
    license: packageJson.license,
  },
  host: HOST + ":" + PORT,
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinition: {
    Token: {
      type: "basicKey",
      in: "header",
      name: "Authorization",
      description:
        "Simple Token Authentication * Example Use: <b>Token ...TokenKey...</b>",
    },
  },
  security: [{ Token: [] }],
  definitions: {
    Department: require("./src/models/department").schema.obj,
    Personnel: require("./src/models/personnel").schema.obj,
    Token: require("./src/models/token").schema.obj,
  },
};

//* To terminal: node swaggerAutogen.js
swaggerAutogen("./src/configs/swagger.json", ["./index.js"], document);
