const express = require('express');
const cors = require('cors')
const app = express();


const port = process.env.port || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const Users=require('./routes/users')
const Diets=require('./routes/user-diet-plan')
const Calculators=require('./routes/calorie-calculator')
const Catering=require('./routes/catering')
const Order=require("./routes/order")
const Product=require("./routes/product")
const Feedback=require("./routes/customer-feedback")
const Admin=require("./routes/admin")


app.use("/users",Users)
app.use("/diet-plan",Diets)
app.use("/calorie-calculator",Calculators)
app.use("/catering",Catering)
app.use("/order",Order)
app.use("/product",Product)
app.use("/feedback",Feedback)
app.use("/admin",Admin)




app.listen(port, () => {
    console.log("server is running on port" + port)
})