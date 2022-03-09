const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const cors = require('cors')
const userRoute = require("./routes/user");
const mysqlconnection = require("./connection");
const app = express();
app.use(cors())

//Init Middleware
app.use(express.json({extended:false}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
dotenv.config({path:"config/config.env"});

app.use("/api/v1/user",userRoute);


app.listen(process.env.PORT,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});