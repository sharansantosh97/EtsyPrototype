const conn = require("../connection.js");
const tableName = "user";
const bcrypt = require('bcrypt');

const { User } = require("../models/user");
exports.registerUser = async (req,res)=>{

    const { name, email, password} = req.body;
    await User.findUserWithEmail(email).then(
      async function (results)
      {
        console.log(results);
        if (results.length > 0) 
        {
           res.status(400).json({ message: "User already exists" });
        }else
        {
          const salt = await bcrypt.genSalt(10);
          const newPass = await bcrypt.hash(password, salt);
          await User.addNewUser(name,email,newPass).then(
          function (results)
          {
            res.status(200).json({message:"User Created Successfully"});
          },
          function (error)
          {
            res.status(500).json({message:"Internal Sever Error"});
          })
        }
      },
      function (error)
      {
        console.log(error);
        res.status(500).json({message:"Internal Sever Error"});
      }
    )
};

exports.updateUser = async (req,res)=>{
  
  let { name, dateOfBirth,email,phoneNumber,gender,address,city,state,zipcode,country,profileImg} = req.body;
  //const id = req.params.id;
  const id = 3;


  await User.updateUserDetails(id,name, dateOfBirth,email,phoneNumber,gender,address,city,state,zipcode,country,profileImg)
  .then(
    function (results)
    {
      res.status(200).json({message:"User Updated Successfully"});
    },
    function (error)
    {
      res.status(500).json({message:"Internal Sever Error"});
    }
  );
  
};