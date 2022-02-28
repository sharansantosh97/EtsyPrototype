const conn = require("../connection.js");
const tableName = "user";
const { User } = require("../models/user");
exports.registerUser = async (req,res)=>{
    try{
    const { name, email, password} = req.body;
    const user = await User.addNewUser({name,email,password});
    console.log("UserID: ", user.insertId);
    res.status(200).json({message:"Working fine"});
    }
    catch (err) {
        console.log("Error: user add new ", err);
      }
};