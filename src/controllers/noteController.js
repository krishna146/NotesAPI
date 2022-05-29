//importing our notes model
const { findByIdAndDelete, findByIdAndRemove } = require("../models/note");
const noteModel = require("../models/note");
//creating note function
const createNote =async (req, res) =>{
    //getting title and description from response body
    const {title, description} = req.body;
    //defining our new note
    const note = noteModel({
        title : title,
        description: description,
        userId: req.userId
    })
    try{
        //saving updating note in our database
        await note.save();
        res.status(201).json({note});

        
    }catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

//update Note Function
const updateNote = async (req , res) =>{
    //getting our paramter from url
    const id = req.params.id;
    const {title, description} = req.body;
    //updating our note
    const updatedNote = {
        title : title,
        description: description,
        userId: req.userId
    };
    try{
        //updating our old note by new note
        await noteModel.findByIdAndUpdate(id, updatedNote, {new: true}); //using await keyword since we r interacting with DB
        res.status(201).json({updatedNote});

        
    }catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}
//deleteNote functon
const deleteNote =async (req, res) =>{
    //getting our note id from request
    const id = req.params.id;
    try{
        //updating our note
        const note = await noteModel.findByIdAndRemove(id);//using await keyword since we r interacting with DB
        res.status(202).json({note});

        
    }catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

//getting note function
const getNote = async (req, res) =>{
    try{
        //filtering our notes from Database based on userId
        const note = await noteModel.find({userId : req.userId});//using await keyword since we r interacting with DB
        res.status(200).json({note});
        
    }catch(error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});l̥
    }
}


module.exports = {
    createNote, 
    updateNote, 
    deleteNote,
    getNote
};