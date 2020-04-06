const express =require("express");
const morgan = require("morgan");
const mongoose =require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
require('./db');
const app =express();

const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const orderRoute = require("./routes/order");
const cateringRoute = require("./routes/catering");
const cartRoute = require("./routes/cart");


const port = process.env.PORT || 3000;



//middleware
app.use(bodyParser.json());
app.use('/user',userRoute);
app.use('/product',productRoute);

app.use('/order',orderRoute);

app.use('/catering',cateringRoute);
app.use('/cart',cartRoute);
app.get("/",function(req,res){
  console.log("welcome");
  res.send("hii");
});


//setting the port
app.listen(3000,function(){
    console.log("server connected");
  });
  