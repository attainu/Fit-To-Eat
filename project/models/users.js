var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
      type: Number,
      required: true,
      default: 0

  }
});

const user=mongoose.model('users',userSchema);
userSchema.statics.findByEmailAndPassword = function(email, password) {
    var userObj = null;
    return new Promise(function(resolve, reject) {
      User.findOne({ email: email })
        .then(function(user) {
          if (!user) reject("Incorrect credentials");
          userObj = user;
          return bcrypt.compare(password, user.password);
        })
        .then(function(isMatched) {
          if (isMatched===false) reject("Incorrect credentials");
          resolve(userObj);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };
  
  userSchema.pre("save", function(next) {
    var user = this;
    if (user.isModified("password")) {
      bcrypt
        .hash(user.password, 10)
        .then(function(hashedPassword) {
          user.password = hashedPassword;
          next();
        })
        .catch(function(err) {
          next(err);
        });
    }
    else{
      next();
    }
    
  });



module.exports = user;