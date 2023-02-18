//importing express library
const express = require("express");
//creating application object
const app = express();
//importing our router
const noteRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
//importing cors
const cors = require("cors");
//importing dot env library -> it will be used to read our env file
const dotenv = require("dotenv");
//it will create environment variable corresponding to our env file
dotenv.config();


//database connectivity
//importing mongoose
const mongoose = require("mongoose");
const { application } = require("express");
//json method to convert response string into json Note: express.json() is also a middleware what it does what the request we receive it converts it into the json then it redirects us to the intented endpoint
app.use(express.json());
//cors middle ware
app.use(cors());//it is also a middleware it will add header insider our api response

//using the router and routing the endpoint /users to userRoutes.js
app.use("/users", userRouter);
//using the router and routing the endpoint /note to userNotes.js
app.use("/note",noteRouter)
app.get("/",(req, res)=>{
    res.status(201).json({message: "Notes API from krishna kumar"})
})
//defining our port number
const PORT = process.env.PORT || 5000; //

//connection to our database
mongoose.connect("mongodb+srv://krishnajsw:85212223@cluster0.jqclb.mongodb.net/?retryWrites=true&w=majority")//process(node process) object is used to access our environment variable
.then(()=>{ //then() callback fun() -> whenever there will be a fn an callback will be called
//listening on port number 5000
    app.listen(PORT, ()=>{
        console.log("Server started on port number " + PORT);
    })
}).catch((error)=>{//if any error then catch fn will be called 
    console.log(error);
})


