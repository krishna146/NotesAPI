//importing express library
const express = require("express");
const {createNote, updateNote, deleteNote, getNote} = require("../controllers/noteController");
//creating router object and accessing router
const noteRouter = express.Router();
//importing our middle ware auth
const auth = require("../middleware/auth");

//following all are our authenticated endpoints 
//whenever we will get request on our notes /note  endpoint , first middleware auth will check for valid token user if yes then he will call the next() function
//getting our notes from mongodb
noteRouter.get("/", auth, getNote);//calling our middleware to verify the user

//creating our notes in mongoDB
noteRouter.post("/", auth, createNote);//calling our middleware to verify the user

//deleting our notes in mongoDB
noteRouter.delete("/:id", auth, deleteNote);//calling our middleware to verify the user

//updating our notes in mongoDB
noteRouter.put("/:id", auth, updateNote);//calling our middleware to verify the user

//exporting this router
module.exports = noteRouter;