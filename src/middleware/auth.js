//defining our midddle ware 


//importing json web token libray
const jwt = require("jsonwebtoken");
//secret key for out token
const SECRET_KEY = process.env.SECRET_KEY;
//defining our middleware
const auth = ((req, res , next) =>{



    try {
        //accesssing our token from request note: authorization token is passed in the header
        let token = req.headers.authorization;
        if(token){
            //processing our token Note: since token is send along with bearer so we will spilt it by space and will get our token
            token = token.split(" ")[1];
            //verifying our token note: if it will be decrypted then we will get our stored data inside this token i.e email and id
            let user = jwt.verify(token, SECRET_KEY);
            //adding userId field inside our response to process further
            req.userId = user.id;
        }
        else{
            //sending response in joson format
            // returning if not a valid user
            return res.status(401).json({message: "unauthorized user"});
        }
        //calling next function it will by default hit the intented endpoint.. now our response will contain one more filed i.e. userId
        next();



    } catch (error) {
        console.log(error);
        res.status(401).json({message: "unauthorized user"})



       
    }
})
//exporting our modeule
module.exports = auth;
