"use strict";

const router = require("express").Router();

const department = require("../controllers/department");

const {
  isLogin,
  isAdmin,
  isAdminOrLead,
} = require("../middlewares/permissions");

router
  .route("/")
  .get(isLogin, department.list)
  .post(isAdmin, department.create);

router
  .route("/:id")
  .get(isLogin, department.read)
  .put(isAdminOrLead, department.update)
  .patch(isAdminOrLead, department.update)
  .delete(isAdmin, department.delete);

router.get("/:id/personnels", department.personnels);

module.exports = router;
