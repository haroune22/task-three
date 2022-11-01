const mongoose = require("mongoose")
const { stringify } = require("querystring")
const usershema = new mongoose.Schema({

    email: {
        type:String,
        require:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    role:{
        type:String,
        defaut:"user",

    },
    createdatt:{
        type:String,
        default:Date.now(),
    },
    token:{
        type : String,
    },

})

const user = mongoose.model("user",usershema);

module.exports = user;


