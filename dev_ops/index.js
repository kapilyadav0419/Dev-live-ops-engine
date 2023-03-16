const express = require("express") ;
const app = express() ;
const bodyparser = require("body-parser")
const Port = process.env.Port || 8080
const mongoose = require("mongoose")
const userRoutes = require("./user.js")
const offerRoutes = require("./offer.js")
mongoose.connect("mongodb://0.0.0.0:27017/user").then(()=>{
    console.log("Successfully connected to db")
}).catch((error)=> {
    console.log("failed to connect to db" ,error)
});
app.use(bodyparser.json()) ;

app.listen(Port , ()=>{
    console.log("server started")
})
app.use("/user" , userRoutes) ;
app.use("/offer",offerRoutes)

