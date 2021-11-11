const {model, Schema} = require("mongoose");

const skills = {
  skill_name: String,
  emp_rating: Number,
  sup_rating: Number
};

const employee = new Schema({
  staffnumber: {type:String, required: true, unique: true},
  firstname: {type:String, required: false},
  lastname: {type:String, required: false},
  email: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  field: {type:String, required: false}, //category
  department: {type:String, required: false}, 
  supervisor: {type: Boolean, default: false},
  supervisorNo: {type:String, required: false}, //for subordinates
  jobTitle: {type:String, required: true}, 

  //Skill categories
  jobSkills: [skills],
  jobSoftSkills: [skills],
  fieldSkills: [skills],
  otherSkills: [skills]
});

// model("table/collection name", objects to be stored in the table/collection )
module.exports = model('employee', employee);