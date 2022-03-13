import mysql from 'mysql';
import util from 'util';


import { readFileSync } from 'fs';
const config = JSON.parse(
  readFileSync(
    new URL('./config.json', import.meta.url)
  )
);


function initdb() {
    return new Promise((resolve, reject) => {
        var connection = mysql.createPool({
            host:config.DB.host,
            user:config.DB.username,
            password: config.DB.password,
            port: config.DB.port,
            database: config.DB.database 
        });
        
        connection.getConnection((err) =>{
            if(err){
                reject('Error occoured' + err)
                // throw 'Error occoured' + err;
            }
            console.log("Connection Created");
        global.query = util.promisify(connection.query).bind(connection);

        global.connection = connection

            resolve("Connection Created")
        });
    })
}

export {initdb}
