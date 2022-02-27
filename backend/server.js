const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const mysqlconnection = require("./connection");
const app = express();
app.use(express.json());
dotenv.config({path:"config/config.env"});

app.use("/api/v1",userRoute);


app.listen(process.env.PORT,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});