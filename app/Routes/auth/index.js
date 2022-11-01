
const express = require("express");
const router = express.Router();
const checklogin = require("../../middleware/auth")
const authcontroller = require("../../controllers/authcontroller")


module.exports=()=>{
    router.post("/register",authcontroller.register)
    router.post("/login",authcontroller.login)
    router.post("/logout",authcontroller.logout)
    router.get("/user/profile",checklogin,authcontroller.account)
    return router;
}