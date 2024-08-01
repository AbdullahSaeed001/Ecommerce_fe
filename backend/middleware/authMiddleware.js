const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const protect = asyncHandler(async (req, res, next) => {
  const {token} = req.headers;
  // console.log(token)

  if(!token){
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  console.log(token)
  const user = jwt.verify(token,process.env.JWT_SECRET)

  if(user){
    next()
  }
  else{
    res.status(401);
    throw new Error('Login expired');
  }

});

module.exports = { protect };
