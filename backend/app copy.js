const mysql = require('mysql');
const express = require('express');
const constants = require("./config.json");
const e = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const { uuid } = require('uuidv4');
let fileName;
const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function(req, file, cb){
       fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
       cb(null, fileName);
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var connection = mysql.createPool({
    host:constants.DB.host,
    user:constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database 
});

connection.getConnection((err) =>{
    if(err){
        throw 'Error occoured' + err;
    }
    console.log("Connection Created");
});

app.use(cors())

function verifyToken(req, res, next){
  const tokenHeader = req.headers['x-authentication-header'];
  if(tokenHeader != 'null'){ 
    try {
      let decoded = jwt.verify(tokenHeader, 'my-secret-key-0001xx01212032432');
      let userId = req.params.userId;
      if(userId == decoded.userId) {
        next();
      } else {
        console.log("Invalid userId found")
        res.status(401).json({msg: 'Unauthorized!'})
      }
    } catch(err) {
      res.status(400).json({msg: 'Server error', err})
    }
  }else{
      res.status(401).json({msg: 'Unauthorized!'})
  }
}

app.use('/users', verifyToken) // middleware for all apis with prefix '/users' 

app.post('/signup', (req, res)=>{
  var data = req.body;
  const username = data.username;
  const password = data.password;
  const email = data.email;
  
  connection.query (`select * from Customers where email = '${email}'`, (err, results, fields)=>{
      if(results.length > 0){
        res.status(401).json({msg: 'Email already exists'});
    }else{
      let newUserId = `u-${uuid()}`
      let userdetails = [newUserId, username, null, null, null, email, null, null];
      connection.query('INSERT INTO mysql.users VALUES (?,?,?,?,?,?,?,?)', userdetails, (err, results, fields)=>{
          !err? res.json(results): res.json(err);
      })
    } 
})
})

app.post('/login', (req, res)=>{
  const email = req.body.email;
  const password = req.body.password;
  
  connection.query (`select * from users where email = '${email}'`, (err, results, fields)=>{
      if(results.length > 0){
        userObj = results[0]
          bcrypt.compare(password, userObj.password, function(err, result) {
              if(!err){
                  const token = jwt.sign({
                      data: {
                          userId : userObj._id,
                          username: userObj.username,
                          email: userObj.email,
                          mobileNumber: userObj.mobileNumber,
                          role: userObj.restFlg,
                      }
                    }, 'my-secret-key-0001xx01212032432', { algorithm: 'RS256', expiresIn: '12h' });
                    res.status(200).json({
                      token: token,
                      msg: 'LoggedIn successfully',
                      data: {
                       username: userObj.username,
                       email: userObj.email,
                       mobileNumber: userObj.mobileNumber,
                       role: userObj.restFlg
                      }
                  })
            }else{
                console.log(err);
              res.status(401).json({msg: 'Login failed'});
            }
        });
    }else{
        res.status(401).json({msg: 'Invalid user name or password'});
    } 
})
})

app.get('/users/:userId/shop/checkavailability', function (req, res) {
      let shopname = req.query.shopname;
      connection.query(`select * from shops where name = '${shopname}'`, (err, results, fields)=>{
            if(err){
              res.status(400).json({msg: 'Error in fetching'});
            }
            if(results.length > 0) {
              res.status(400).json({available: false});
            } else {
              res.status(200).json({available: true});
            }
      })
});

app.post('/users/:userId/shops',(req,res,next)=>{
  let body = req.body;
  let shopname = body.name;
  let userId = req.params.userId; // verifiying userId in middleware
  let newShopId = `sh-${uuid()}`
  let data = [newShopId, shopname, body.imageUrl, userId, new Date()];
  connection.query('INSERT INTO shops VALUES (?,?,?,?,?)', data, (err, results, fields)=>{
      !err? res.json(results): res.json(err);
  })
})

app.get('/users/:userId/shops/:shopId',(req,res,next)=>{
  let body = req.body;
  let shopname = body.name;
  let userId = req.params.userId; // verifiying userId in middleware
  let shopId = body.shopId;
  connection.query(`select * from shops where _id = '${shopId}'`, (err, results, fields)=>{
    if(err){
      res.status(400).json({msg: 'Error in fetching shop by id'});
    }
    if(results.length > 0) {
      let shopDetails = results[0];
      res.status(200).json(shopDetails);
    } else {
      res.status(400).json({msg: `No shop exist for shopId: ${shopId}`});
    }
})
})

app.get('/users/:userId/shops/:shopId/products',(req,res,next)=>{
  let userId = req.params.userId; // verifiying userId in middleware
  let shopId = req.params.shopId;
  connection.query(`select * from products where shopId = '${shopId}'`, (err, results, fields)=>{
    if(err){
      res.status(400).json({msg: 'Error in fetching shop products'});
    }
    let products = results;
    res.status(200).json(
      {
        products
      });
    return;
})
})

app.post('/users/:userId/shops/:shopId/products',(req,res,next)=>{
  let body = req.body;
  let {name, imageUrl, categoryId, description, price, quantity} = body
  let {userId, shopId} = req.params; // verifiying userId in middleware
  let newProductId = `p-${uuid()}`
  let productDetails = [newProductId, name, imageUrl, categoryId, description, price, quantity, shopId, userId, new Date()];
  connection.query('INSERT INTO products VALUES (?,?,?,?,?)', productDetails, (err, results, fields)=>{
      !err? res.json(results): res.json(err);
  })
})

app.post('/users/:userId/favorites',(req,res,next)=>{
  let body = req.body;
  let {productId} = body
  let {userId} = req.params; // verifiying userId in middleware
  let newFavoriteId = `fav-${uuid()}`
  let favoriteDetails = [newFavoriteId, userId , productId, new Date()];
  connection.query('INSERT INTO favorties VALUES (?,?,?,?)', favoriteDetails, (err, results, fields)=>{
      !err? res.json(results): res.json(err);
  })
})

// --------------- END ----------------//

app.listen(3001, function () {
    console.log("Server listening on port 3001");
});

module.exports = app;



