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
  
  export {verifyToken}
