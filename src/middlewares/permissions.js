"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("No Permission: You Must Login");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("No Permission: You Must Login and to be Admin");
    }
  },
  isAdminOrLead: (req, res, next) => {
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin || req.user.isLead)
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("No Permission: You Must Login and to be Admin or Lead");
    }
  },
};
