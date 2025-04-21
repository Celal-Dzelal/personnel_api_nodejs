"use strict";

/*//! -------------------------- Personnel Api NodeJs -------------------------- */

//* Initial Commands for terminal

// $ npm i express dotenv mongoose
// $ npm i cookie-session
// $ npm i jsonwebtoken

/*//! ------------------------------ Requirements ------------------------------ */

const express = require("express"); //* Import express
const app = express(); //* Create a variable and assign express to it

require("dotenv").config(); //* Import dotenv and configure
const PORT = process.env.PORT || 8000; //* Create a variable named PORT and assign a value from .env, if no value is found in .env use port 8000.

/*//! ------------------------------- Middlewares ------------------------------ */

app.use(express.json()); //* If the body of the incoming request is in JSON format, automatically parse it and place it in the req.body object.

/*//! ----------------------------- Session-Cookies ---------------------------- */

const session = require("cookie-session"); //* Include cookie-session library in the project for cookie-based session management

//* Define a middleware for session management in an Express application
app.use(
  session({
    secret: process.env.SECRET_KEY, //* Use a secret key to secure sessions
  })
);

/*//! ----------------------------- Query Handler ----------------------------- */

app.use(require("./src/middlewares/queryHandler"));

/*//! ------------------------------ DB Connection ----------------------------- */

/*//! --------------------------------- Routes --------------------------------- */

//* Create main route (It has to be top)

app.all("/", (req, res) => {
  res.send({
    message: "Welcome to Personnel Api NodeJs Created by Dzelal",
  });
});

/*//! ------------------------------ ErrorHandler ------------------------------ */

/*//! ------------------------------- Run Server ------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/*//! ----------------------------- Syncronization ----------------------------- */
