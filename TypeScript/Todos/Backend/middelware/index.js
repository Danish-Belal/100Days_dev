const jwt= require('jsonwebtoken')
const {Response} = require('express')
const SECRET = 'SECr3t'

const authenticateJWT = (req, res , next) =>{
     const authHeader = req.headers.authorization;
     if(authHeader){
          const token = authHeader.split(' ')[1];
          jwt.verify(token, SECRET, (err , user)=>{
               if(err){
                    return res.sendStatus(403)
               }else{
                    req.userId = user.id;
                    next();
               }
          })

     }else{
          res.sendStatus(401)
     }
};

module.exports = {
     SECRET,
     authenticateJWT
}