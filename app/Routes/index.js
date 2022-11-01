const express = require("express")
const Router = express.Router();
const userRoutes = require("./users")
const postRoutes = require("./posts")
const authroutes = require("./auth")



module.exports = () => {
    Router.use("/posts",postRoutes())
    Router.use("/users",userRoutes())
    Router.use("/auth",authroutes())
    return Router;
}