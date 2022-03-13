import mysql from 'mysql'

var connection = mysql.createPool({
        "host" : "etsyprototype.cw2vtx36a6pa.us-east-1.rds.amazonaws.com",
        "username" : "sharansantosh97",
        "password" : "Sharan1997",
        "port" : "3306",
        "database" : "etsyprototype"
});

var categories = [
    ["ct-1234", "mobiles", null, null, true],
    ["ct-1235", "tops", null, null, true],
    ["ct-12346", "innerwear", null, null, true]
] 
connection.getConnection((err) => {
  if (err) {
    console.log("######### error occurred")
    throw 'Error occoured' + err;
  }
  console.log("Connection Created");
  categories.forEach((category) => {
    connection.query('INSERT INTO category VALUES (?,?,?,?,?)', category, (err, results, fields)=>{
      console.log(err, results)
    })
  })

});
