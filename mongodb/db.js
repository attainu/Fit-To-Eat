const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://pallishree_behera:pallishree121096@fit-to-eat-njbmh.mongodb.net/test?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(function(){
    console.log("Database connected");
})
.catch(function(err){
    console.log(err.message)
});