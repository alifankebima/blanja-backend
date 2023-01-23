const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.SECRETKEY_JWT);
      req.payload = decoded;
      next();
    } else {
      res.json({ message: "server need token" });
    }

  } catch (error) {
    if (error && error.name === 'JsonWebTokenError') {
      next(new createError(400, 'Token invalid'));
    } else if (error && error.name === 'TokenExpiredError') {
      next(new createError(400, 'Token expired'));
    } else {
      next(new createError(400, 'Token not active'));
    }
  }
}

const isSeller = (req, res, next) => {
  const payload = req.payload;
  if(payload){
    if(payload.role === "seller"){
      next();
    } else {
      res.json({ message : "user are not seller (unauthorized)"});
    }
  } else {
    res.json({ message : "role not found" });
  }
}

const isCustomer = (req, res, next) => {
  const payload = req.payload;
  if(payload){
    if(payload.role === "customer"){
      next();
    } else {
      res.json({ message : "user are not customer (unauthorized)"});
    }
  } else {
    res.json({ message : "role not found" });
  }
}

module.exports = { protect, isSeller, isCustomer }