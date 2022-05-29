//importing express library
const express = require("express");
//sigin signup function exported automatically
const { signup, signin } = require("../controllers/userController");
//creating router object and accessing router
const userRouter = express.Router();

userRouter.get("/", (req, res)=>{
    console.log("in user router");
});

//on hitting endpoint "signup: we r calling our signup function
userRouter.post("/signup",signup);
//on hitting endpoint "signin: we r calling our signin function
userRouter.post("/signin",signin);

//exporting this router
module.exports = userRouter;
