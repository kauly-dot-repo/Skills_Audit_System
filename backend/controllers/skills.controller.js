const Employee = require('../models/employee.model');

const express = require('express');
const app = express();
app.use(express.json());


//SKILLS ACTIONS
module.exports = app => {
  //Add New Skill -------------------------------
  //Field-Related Skill
  app.post('/new-field-skill', (req, res) => {
    const data = req.body;

    return Employee.updateOne(
      { email: data.email },
      {
        $push: {
          jobSkills: {
            skill_name: data.skill_name,
            emp_rating: data.emp_rating
          }
        }
      },
      {
        multi: true,
        upsert: true
      }
    )
      .then(
        result => {
          return res.send(result);
        }
      );
  });

  //Job-Related Skill
  app.post('/new-job-skill', (req, res) => {
    const data = req.body;

    return Employee.updateOne(
      { email: data.email },
      {
        $push: {
          fieldSkills: {
            skill_name: data.skill_name,
            emp_rating: data.emp_rating
          }
        }
      },
      {
        multi: true,
        upsert: true
      }
    )
      .then(
        result => {
          return res.send(result);
        }
      );
  });

  //Other Skill
  app.post('/new-other-skill', (req, res) => {
    const data = req.body;

    return Employee.updateOne(
      { email: data.email },
      {
        $push: {
          otherSkills: {
            skill_name: data.skill_name,
            emp_rating: data.emp_rating
          }
        }
      },
      {
        multi: true,
        upsert: true
      }
    )
      .then(
        result => {
          return res.send(result);
        }
      );
  });


  //Add Supervisor Rating -------------------------------
  //Field-Related Skill
  app('supervisor-field-rating', (req, res) => {
    const data = re.body;

    return Employee.updateOne(
      {
        email: data.email,
        "fieldSkills.skill_name": data.skill_name
      },
      {
        $set: {
          "fieldSkills.$.sup_rating": data.sup_rating
        }
      },
      { multi: true, upsert: true }
    ).then(result => {
      return res.send(result);
    });
  });

  //Job-Related Skill
  app('/supervisor-job-rating', (req, res) => {
    const data = re.body;

    return Employee.updateOne(
      {
        email: data.email,
        "jobSkills.skill_name": data.skill_name
      },
      {
        $set: {
          "jobSkills.$.sup_rating": data.sup_rating
        }
      },
      { multi: true, upsert: true }
    ).then(result => {
      return res.send(result);
    });
  });



  //Add Supervisor Rating -------------------------------
  //Field-Related Skill
  app('/update-field-rating', (req, res) => {
    const data = re.body;

    return Employee.updateOne(
      {
        email: data.email,
        "fieldSkills.skill_name": data.skill_name
      },
      {
        $set: {
          "fieldSkills.$.sup_rating": data.sup_rating
        }
      },
      { multi: true, upsert: true }
    ).then(result => {
      return res.send(result);
    });
  });

  //Job-Related Skill
  app('/update-job-rating', (req, res) => {
    const data = re.body;

    return Employee.updateOne(
      {
        email: data.email,
        "jobSkills.skill_name": data.skill_name
      },
      {
        $set: {
          "jobSkills.$.sup_rating": data.sup_rating
        }
      },
      { multi: true, upsert: true }
    ).then(result => {
      return res.send(result);
    });
  });

  //Other Skill
  app('/update-other-rating', (req, res) => {
    const data = re.body;

    return Employee.updateOne(
      {
        email: data.email,
        "otherSkills.skill_name": data.skill_name
      },
      {
        $set: {
          "otherSkills.$.sup_rating": data.sup_rating
        }
      },
      { multi: true, upsert: true }
    ).then(result => {
      return res.send(result);
    });
  });




}