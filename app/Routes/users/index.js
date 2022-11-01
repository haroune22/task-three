const express = require("express")
const usercontroler = require("../../controllers/usercontroler")
const Router = express.Router()

module.exports = () => {
    Router.get("/", usercontroler.getallusers) //methode : get
    Router.post("/",usercontroler.addoneuser)//methode : post
    Router.get("/:id",usercontroler.getuserbyid) //methode : get
    Router.put("/:id",usercontroler.updateuserbyid) //methode : put
    Router.delete("/:id",usercontroler.delateuserbyid) //methode : delate

    return Router;
}