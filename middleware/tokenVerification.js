var jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const headers = req.headers['authorization'];
    const token = headers.split(" ")[1];
    if(!token){
      res.status(404).json({message:"NO token found"})
    }
    jwt.verify(String(token),process.env.Jwt_SECRET_Key,(err,user)=>{
      if(err){
        return res.status(400).json({message:"invalid Token"})
      }
      console.log(user.id);
      req.id = user.id
    })
    next()
  }

exports.verifyToken = verifyToken;
