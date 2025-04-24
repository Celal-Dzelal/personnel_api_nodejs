"use strict";

const router = require("express").Router();

const { list, create, read, deleteToken } = require("../controllers/token");
const { isAdmin } = require("../middlewares/permissions");

router.use(isAdmin);

router.route("/").get(list).post(create);

router.route("/:id").get(read).delete(deleteToken);

module.exports = router;
