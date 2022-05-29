//importing mongoose
const mongoose = require("mongoose");
//defining object
const NoteSchema = mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required: true
    }, 
    userId:{
        type: mongoose.Schema.Types.ObjectId,//object id of user
        ref : "User",//refering to our userSchema
        required: true
    }
},{timestamps: true});//it will add field created at and modified at inside our schema

//exporting our schema
module.exports = mongoose.model("note", NoteSchema);//exporting and defining our node name as "note" inside database