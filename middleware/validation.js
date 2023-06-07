const User = require('../model/User')
const { check, validationResult } = require("express-validator");
const createError = require('http-errors')
const fs = require("fs");

const userValidation = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .normalizeEmail().custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        User.find({email:req.body.email}, function(err, user){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(user) {
            reject(new Error('E-mail already in use'))
          }
          resolve(true)
        });
      });
    }),
  check("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
];

const addUserValidationHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try{
    if (!errors.isEmpty()) {
      if (req.file) {
         fs.unlink(req.file.path, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
     await Promise.reject(errors.mapped());
    } else {
      next();
    } 
  }catch(err){
    console.error(">>>>>>>"+err);
    res.status(500).send({
      errors:err
    })
  }

       
};

module.exports = {
  userValidation,
  addUserValidationHandler,
};
