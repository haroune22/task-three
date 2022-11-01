const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
require ("./config/db").connect();
const PORT = process.env.PORT || 4700;

const apiRoutes = require("./Routes")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))

app.use("/api",apiRoutes())

app.listen(PORT,()=> console.log(`APP is listening on PORT ${PORT}`))