//importing our model
const userModel = require("../models/user");
//importing bcrypt library
const bcrypt = require("bcrypt");
//importing json web token libray
const jwt = require("jsonwebtoken");
const user = require("../models/user");
//secret key for out token
const SECRET_KEY = process.env.SECRET_KEY;

//defining function for signup(asynchronous function)
const signup = async (req, res) => {
    //existing User
    //Hashed Password
    //User Creation
    //token Generation
    //storing properties inside our response to three variable username email and password
    const {username, email, password} = req.body;
    try {
        //checking for existing user in our mongoDB
        const existingUser = await userModel.findOne({email : email}); // await to wait for the result (make sure parent function asynchronous)
        if(existingUser){
            //sending json 400 -> for bad request
            return res.status(400).json({message: "User Already Exists"});n
        }
        //generating hashed password
        const hashedPassword = await bcrypt.hash(password, 10);//asynchronous function hash
        //user creating in our mongoDB
        const result = await userModel.create({
            email :email,
            password : hashedPassword,
            username: username
        });
        //token generation
        const token = jwt.sign({email : result.email, id : result._id}, SECRET_KEY);
        //sending json response(user and token) and status 201 -> succcessfully record created
        res.status(201).json({user : result, token: token });
        
    } catch (error) {
        console.log(error);
        //sending json 
        res.status(500).json({message: "Something Wrong"});
    }
}
//defining signin function
const signin =async (req, res) =>{
    console.log(req.body);
    //extracting email and password from our respnse
    const {email,password} = req.body;
    try {
        //existing user or not from db
        const existingUser= await userModel.findOne({email: email});
        //check for existing user
        if(!existingUser){
            return res.status(404).json({message: "User Not found"});
        }
        //comparing password from our body password and mongoDb password
        const matchPassword = await bcrypt.compare(password, existingUser.password);//using await keyword since we r interacting with DB
        if(!matchPassword){
            //404 for bad request
            return res.status(400).json({message: "Invalid Credential"})
        }
        //token generation
        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY);
        res.status(200).json({user: existingUser, token: token});//200 -> for everything ok
        
        
    } catch (error) {
        console.log(error);
        //sending json
        res.status(500).json({message: "Something Wrong"});l̥
    }
}

//exporting our function 
module.exports = {signup, signin};




























