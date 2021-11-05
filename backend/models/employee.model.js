const {model, Schema} = require("mongoose");

const skills = {
  skill_name: String,
  emp_rating: Number,
  sup_rating: Number
};

const employee = new Schema({
  firstname: {type:String, required: true},
  lastname: {type:String, required: true},
  email: {type:String, required: true},
  password: {type:String, required: true},
  field: {type:String, required: true}, //category
  department: {type:String, required: true}, 
  supervisor: {type: Boolean, default: false},
  jobTitle: {type:String, required: true}, 

  //Skill categories
  jobSkills: [skills],
  jobSoftSkills: [skills],
  fieldSkills: [skills],
  otherSkills: [skills]
});

// model("table/collection name", objects to be stored in the table/collection )
module.exports = model('employee', employee);