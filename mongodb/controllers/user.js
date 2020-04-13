var dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require('../models/user');
const mongoose = require("mongoose");
dotenv.config();



exports.user_create_user =(req,res)=>{
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    User.addUser(user , (err,result)=>{
        if(err){
            return res.json({success: false, message: err})
        }
        return res.json({success: true, message:result});
    });
};

exports.user_login_user =(req,res,next)=>{
    User.findOne({email: req.body.email })
    .exec()
    .then(user =>{
        if (user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }  
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if (err){
                 return res.status(401).json({
                     message:'Auth failed'
                 });
            }
            if(result){
               const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                },
                process.env.JWT_KEY,
                {
                      expiresIn: "1h"
                }
                );
                user.token=token;
                user.save()
                return res.status(200).json({
                    message:" Auth successful",
                    token:token
                });
            }res.status(401).json({
                message:"Auth failed"
            });
    })
   
 })  .catch(err =>{
    console.log(err);
    res.status(500).json({
        error: err
    })
}) 

 };