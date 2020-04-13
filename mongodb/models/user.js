const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type:String,
        required: false
    }
    

});



   
const User = mongoose.model('user',userSchema);

//save user to database

User.addUser = function(user,callback){


    bcrypt.genSalt(10,(err, salt)=>{
        if(err){
            callback('server error');
        }else {
            bcrypt.hash(user.password, salt, (err,hash)=>{
                if(err){
                    callback('server error');
                }else{
                    user.password = hash;
                    user.save((err,result)=>{
                        if(err){
                            console.log(err);
                            return callback("Failed to add")
                        }else{
                            callback(null,'user added')
                        }
                   });
                }
            });
        }
    })




 
};



module.exports = User;



