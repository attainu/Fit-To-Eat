
const jwt = require("jsonwebtoken")
const User =  require("../models/user")
module.exports = async  (req,res,next) =>{
    try{
        const token =  req.headers.Authorization
        console.log(token);
        const payload = await jwt.verify(token,process.env.JWT_KEY);
        if(payload){
            const user = User.findOne({token:token, _id:payload.userId})
            req.userData =  decoded;
            next(); 
        }
       else return res.status(403)
      .send("Unauthorise")
    }catch (error){
        return res.status(401).send(error)
    } 

};