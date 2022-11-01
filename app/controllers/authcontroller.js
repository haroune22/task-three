const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//register new user
exports.register = async (req,res)=>{
    try {
        const {email,password,firstname,lastname,profession,company} = req.body
        if(!(email && password && firstname && lastname && profession && company)){
            return res.status(400).send("all input required")
        }
        //check user if already exist
        const olduser = await User.findOne({ email })
        if(olduser){
            return res.status(409).send("user already exist, please login");
        }

        //encrypt user password 
        const encryptedpassword = await bcrypt.hash(password, 10);
        //saving our new created
        const saveduser = await User.create({
            email,
            password:encryptedpassword,
            firstname,
            lastname,
            profession,
            company,
        })
        // generate token 
        const token = jwt.sign({user_id:saveduser._id,email:email},process.env.token_key,
            {expiresIn:"2h"})
            //seve user token
            saveduser.token = token;
            res.status(201).send(saveduser)

    } catch (err) {
        res.status(500).send(err.message)
    }
}


//login user

exports.login = async (req,res)=>{
    try {
        //get user input
        const {email,password} = req.body;
        //vaidate
        if(!(email && password)){
            return res.status(400).send("all input are required");
        }
        //vaidate if user exist in our database 
        const user = await User.findOne({email});
        if(user &&(await bcrypt.compare(password, user.password))){
            //create token
            const token = jwt.sign(
                { user_id: user._id,email},
                process.env.token_key,
                {expiresIn:"2h"}
                // register token
            )
            user.token = token;
          return  res.status(200).send({message:"user logged in",data:user})
        }else{
         return   res.status(409).send("incorrect email or password")
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

//logout

exports.logout = async (req,res)=>{
    try {
        if(req.user){
            await req.logout();
        return    res.status(200).send({message :"loggin out"})
        }else{
        return   res.status(409).send({message:"no user to logout"})
        }
    } 
    catch (err) {
        res.status(500).send(err.message)
    }
}

//get my account function

exports.account = async(req,res)=>{
    if(req.user){
        await res.json({
            user : req.user
        })
    }else{
        await res.json({ user : null})
    }
}



