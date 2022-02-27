const mysql = require("mysql2");
const mysqlconnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"sharansreedevi",
    database:"Etsy",
    multipleStatements:true
});

mysqlconnection.connect((err)=>{
    if(!err)
    {
        console.log(`Conneted`);
    }else
    {
        console.log(`Connection Failed`);
        console.log(err);
    }
});

module.exports = mysqlconnection;
