const mongoose = require("mongoose") ;
const userSchema = new mongoose.Schema({
    username :{
        type : String ,
        require : true
    } , 
    password :{
        type : String ,
        require:true
    }
    
})
const user  =new mongoose.model("user",userSchema)
module.exports = {user}