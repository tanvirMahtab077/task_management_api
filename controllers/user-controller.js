const User = require("../model/User");
const bcrypt = require('bcryptjs');
const { json } = require("express");
var jwt = require('jsonwebtoken');
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password)
  let existingUser;
  const user = new User({
    name,
    email,
    password:hashedPassword,
  });
  try {
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "The user already exist" });
    } else {
      await user.save();
      res.status(201).json({ message:"The user has been created successfully" });
    }
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res, next) => {
  const {email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
  if(!isPasswordCorrect){
    return res.status(400).json({message:'Invalide Email / Password'})
  }
  const token = jwt.sign({id:existingUser._id}, process.env.Jwt_SECRET_Key,{
    expiresIn:'1hr'
  }) 

  res.cookie(String(existingUser._id),token,{
    path:'/',
    expires:new Date(Date.now() + 100000 * 36),
    httpOnly:true,
    saemSite:'lax'
  })

  return res.status(200).json({message:'Successfully Logged In',user:existingUser,token})
};

const getUser = async (req,res, next)=>{
  const userId = req.id;
  let user;
  try{
    user = await User.findById(userId,"-password")
  }catch(err){
    return new Error(err)
  }
  if(!user){
    return res.status(404).json({message:"User Not Found"})
  }
  return res.status(200).json({user});
}


exports.signup = signup;
exports.login = login;
exports.getUser = getUser;