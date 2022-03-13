import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function login(req, res) {
    const email = req.body.email;
    var password = req.body.password;
    
    connection.query (`select * from users where email = '${email}' and password='${password}'`, (err, results, fields)=>{
        if(results && results.length > 0){
          let userObj = results[0]
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
                      }, 'my-secret-key-0001xx01212032432', { expiresIn: '12h' });
                      res.status(200).json({
                        token: token,
                        msg: 'LoggedIn successfully',
                        data: {
                         username: userObj.username,
                         userId: userObj._id
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
}

let endpoints = {
    '/login': [{
        method: 'POST',
        callbacks: [login] // last index function is always a rest function
    }]
}

export {endpoints}
