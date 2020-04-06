var express = require('express');
var jwt = require('jsonwebtoken')
var dotenv = require('dotenv');
var app = express();
dotenv.config();
require('./db')

// var signin = require('./models/users')
var userRoute = require('./routes/users')
var dietPlan = require("./routes/user-diet-plan")
var calorieCalculator = require("./routes/calorie-calculator")
// var adminRoute = require('./routes/admin')
// var catering=require('./routes/corporate-catering')
var User = require('./models/users')
// var Admin = require('./models/admin')
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/diet', dietPlan)
app.use('/calculator', calorieCalculator)
// app.use('/cart',catering)
//login users(login)
//logout
const port = process.env.PORT || 5000;
var getUserData = function (req, res, next) {
  if (req.headers && req.headers.authorization) {
    let accessToken = req.headers.authorization;
    req.user = {}
    jwt.verify(accessToken, process.env.secretKey, function (err, decodedData) {
      if (err) {
        res.json({ error: err, status: 406 })
      } else {
        User.findById(decodedData._id, function (error, user){
          if (error) {
            res.json({ error, status: 406 })
          } else {
            req.user = user;
            req.user.error = false;
            next();
          }
        })
      }
    })
  } else {
    res.json({ error: "Invalid access key", status: 406 })
  }
}

app.get('/getuser', getUserData, function (req, res) {
  if (req.user.error) {
    res.json({ status: 406, user: req.user.error })
  } else {
    res.json({ status: 200, user: req.user })
  }
})

// var getAdminData = function (req, res, next) {
//   if (req.headers && req.headers.authorization) {
//     let accessToken = req.headers.authorization;
//     req.admin = {}
//     jwt.verify(accessToken, process.env.secretKey, function (err, decodedData) {
//       if (err) {
//         res.json({ error: err, status: 406 })
//       } else {
//         Admin.findById(decodedData._id, function (error, admin){
//           if (error) {
//             res.json({ error, status: 406 })
//           } else {
//             req.admin = user;
//             req.admin.error = false;
//             next();
//           }
//         })
//       }
//     })
//   } else {
//     res.json({ error: "Invalid access key", status: 406 })
//   }
// }



// app.get('/getadmin', getAdminData, function (req, res) {
//   if (req.admin.error) {
//     res.json({ status: 406, user: req.admin.error })
//   } else {
//     res.json({ status: 200, user: req.admin })
//   }
// })
//setting the port

app.listen(port, function () {
  console.log('server connected');
});