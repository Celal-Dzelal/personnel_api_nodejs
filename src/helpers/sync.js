"use strict";

module.exports = async function () {
  return null;

  const mongoose = require("mongoose");
  await mongoose.connection.dropDatabase();
  console.log("Database and all Data are DELETED");

  const Department = require(""); //* Not ready yet
  const Personnel = require(""); //* Not ready yet

  const departments = [
    "FullStack Department",
    "DevOps Department",
    "CyberSec Department",
  ];

  departments.forEach((value) => {
    Department.create({ name: value }).then((department) => {
      console.log("** Departments Added **");
      for (let i in [...Array(10)]) {
        Personnel.create({
          departmentId: department._id,
          username: "test" + (value[0] + i),
          password: "1234",
          firstName: "firstName",
          lastName: "lastName",
          phone: "12345678910",
          email: "test" + (value[0] + i) + "@site.com",
          title: "title",
          salary: 2500,
          description: "description",
          isActive: true,
          isAdmin: false,
          isLead: false,
          startedAt: "2023-10-15 13:14:15",
        });
      }
      console.log("** Personnels Added **");
    });
  });
};
