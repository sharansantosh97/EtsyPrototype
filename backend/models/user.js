const conn = require("../connection.js");
const tableName = "user";

class User {

    //New User Creation
    static addNewUser = async ({name,email,password})=>{
        return new Promise((resolve,reject)=>{
            const sqlStatement = `INSERT INTO ${tableName} (name, email, password) VALUES ("${name}", "${email}", "${password}")`;
            conn.query(sqlStatement,(error,results)=>{
                if (error) {
                    console.log(error);
                    return reject(error);
                  }
                  console.log("ADD USER RESULTS: ", results);
                  return resolve(results);
            });
        });
    }

    //Update Existing User
    static updateUserDetails = async ({name,email,password})=>{

    }

}


module.exports.User = User;
