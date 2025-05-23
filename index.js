"use strict";

/*//! -------------------------- Personnel Api NodeJs -------------------------- */

//* Initial Commands for terminal

// $ npm i express dotenv mongoose
// $ npm i cookie-session
// $ npm i jsonwebtoken
// $ npm i morgan

/*//! ------------------------------ Requirements ------------------------------ */

const express = require("express"); //* Import express
const app = express(); //* Create a variable and assign express to it

require("dotenv").config(); //* Import dotenv and configure
const PORT = process.env.PORT || 8000; //* Create a variable named PORT and assign a value from .env, if no value is found in .env use port 8000.

/*//! ------------------------------- Middlewares ------------------------------ */

app.use(express.json()); //* If the body of the incoming request is in JSON format, automatically parse it and place it in the req.body object.

//? Session-Cookies

const session = require("cookie-session"); //* Include cookie-session library in the project for cookie-based session management

//* Define a middleware for session management in an Express application
app.use(
  session({
    secret: process.env.SECRET_KEY, //* Use a secret key to secure sessions
  })
);

//? Query Handler

app.use(require("./src/middlewares/queryHandler"));

//? DB Connection

require("./src/configs/dbConnection");

//? Authentication

app.use(require("./src/middlewares/authentication"));

//? Morgan - Logger

app.use(require("./src/middlewares/logger"));

/*//! ------------------------------ Documentation ----------------------------- */

// * npm i swagger-autogen
//* npm i swagger-ui-express
//* npm i redoc-express

//? Json Route

app.use("/documents/json", (req, res) => {
  res.sendFile("/src/configs/swagger.json", { root: "." });
});

//? Swagger

const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./src/configs/swagger.json");
app.use(
  "/documents/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);

//? Redoc

const redoc = require("redoc-express");
app.use(
  "/documents/redoc",
  redoc({ specUrl: "/documents/json", title: "Redoc UI" })
);

/*//! --------------------------------- Routes --------------------------------- */

//* Create main route (It has to be top route)

app.all("/", (req, res) => {
  res.send({
    message: "Welcome to Personnel Api NodeJs Created by Dzelal",
  });
});

//? Department Route

app.use("/departments", require("./src/routes/departments"));

//? Personnel Route

app.use("/personnels", require("./src/routes/personnel"));

//? Token Route

app.use("/tokens", require("./src/routes/token"));

//? Auth Route

app.use("/auth", require("./src/routes/auth"));

//? Not Found

app.use(/^\/.*$/, (req, res) => {
  res.status(404).send({
    error: true,
    message: "This route is not found",
  });
});

/*//! ------------------------------ ErrorHandler ------------------------------ */

app.use(require("./src/middlewares/errorHandler"));

/*//! ------------------------------- Run Server ------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/*//! ----------------------------- Syncronization ----------------------------- */

// require("./src/helpers/sync")(); //* Run it only once
