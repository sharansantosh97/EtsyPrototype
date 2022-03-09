const conn = require("../connection.js");
const tableName = "user";

class User {

    //New User Creation
    static addNewUser = async (name,email,password)=>{
        return new Promise((resolve,reject)=>{
            const sqlStatement = `INSERT INTO ${tableName} (name, email, password) VALUES ("${name}", "${email}", "${password}")`;
            conn.query(sqlStatement,(error,results)=>{
                if (error) 
                {
                    console.log("promise"+error);
                    return reject(error);
                  }
                  console.log("ADD USER RESULT: ", results);
                  return resolve(results);
            });
        });
    }

    //Update Existing User
    static updateUserDetails = async (userID,name,dateOfBirth,email,phoneNumber,gender,address,city,state,zipcode,country,profileImg)=>{

        return new Promise((resolve,reject)=>{
            const sqlStatement = `UPDATE ${tableName} set name ="${name}", dob="${dateOfBirth}", email="${email}", phoneNumber="${phoneNumber}", gender="${gender}", address="${address}", city="${city}", state="${state}", zipcode="${zipcode}", country="${country}", profileImg="${profileImg}" where userID="${userID}"`;
            conn.query(sqlStatement,(error,results)=>{
                if (error) {
                    console.log(error);
                    return reject(error);
                  }
                  console.log("UPDATE Customer RESULTS: ", results);
                  return resolve(results);
            });
        });

    }

    // Find User with ID
    static findUserWithID = (userID) => {
        return new Promise((resolve, reject) => {
          const sqlStatement = `select * from ${tableName} where userID = ${userID}`;
          conn.query(sqlStatement, (error, results) => {
            if (error) {
              console.log(error);
              return reject(error);
            }
            console.log("FIND BY USER ID", results);
            return resolve(results);
          });
        });
      };

    // Find User with ID
    static findUserWithEmail = (email) => {
        console.log(email);
        return new Promise((resolve, reject) => {
          const sqlStatement = `select * from ${tableName} where email = "${email}"`;
          conn.query(sqlStatement, (error, results) => {
            if (error) {
              console.log(error);
              return reject(error);
            }
            console.log("FIND BY USER EMAIL", results);
            return resolve(results);
          });
        });
      };



}


module.exports.User = User;
