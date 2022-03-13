import {uuid} from 'uuidv4';

function signUp(req, res) {
    var data = req.body;
    const userName = data.username;
    const password = data.password;
    const email = data.email;
    
    connection.query (`select * from users where email = '${email}'`, (err, results, fields)=>{
        if(results && results.length > 0){
          res.status(401).json({msg: 'Email already exists'});
      }else{
        let newUserId = `u-${uuid()}`
            let columns = ["_id", "username", "imageUrl", "dob", "gender", "address", "city", "state", "country", "about", "email", "phoneNo", "password"]
        let userdetails = [newUserId, userName, null, null, null, null, null, null, null, null, email, null, password];
        connection.query('INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', userdetails, (err, results, fields)=>{
            !err? res.json(results): res.json(err);
        })
      } 
  })
}

let endpoints = {
    '/signup': 
    [
        {
        method: 'POST',
        callbacks: [signUp]
        }
    ]
}

export {endpoints}
