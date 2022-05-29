//importing mongoose
const mongoose = require("mongoose");
//defining object
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    }
},{timestamps: true});//it will add field  created at and modified at inside our schema

//exporting our schema
module.exports = mongoose.model("User", UserSchema);