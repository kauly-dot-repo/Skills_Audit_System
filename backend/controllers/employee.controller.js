const Employee = require('../models/employee.model');

const express = require('express');
const app = express();
app.use(express.json());

//EMPLOYEE ACTIONS
module.exports = app => {
  //Add/Register Employee--------------------------------------
  app.post('/register', async (req, res) => {
    const data = req.body;

    const register = await new Employee({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      field: data.field, //drop-down
      //drop down - depending on field
      department: data.department,
      supervisor: data.supervisor,
      //drop down - depending on field
      jobTitle: data.jobTitle
    }).save();

    return res.send(register);
  });

  //Login-----------------------------------------------------
  app.post("/login", (req, res) => {
    const data = req.body;

    return Employee.findOne({ email: data.email, password: data.password }, { _id: 0, password: 0 })
      .then(result => res.send(result));
  });

  //Retrieve/Find All Employees-------------------------------
  app.get('/getAllEmployees', (req, res) => {
    const data = req.body;

    return Employee.find({},
      {
        _id: 0,
        password: 0,
        jobSkills: 0,
        fieldSkills: 0,
        otherSkills: 0,
        __v: 0,

      })
      .then(result => res.send(result))

  });

  //Delete ONE Employee--------------------------------------
  app.delete("/deleteEmployee", (req, res) => {
    const data = req.body;

    return Employee.deleteOne(
      {
        email: data.email,
        password: data.password

      },
      {
        _id: 0,
        __v: 0,
      })
      .then(result => res.send(result));
  });

}