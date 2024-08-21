const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verifyToken = async (req, res, next) => {
    // autenticação
    const secretKey = "teste123" 
    const headertoken = req.headers.authorization ? req.headers.authorization : '';
    const token = headertoken.split(' ')[1];
    let verify = false;
    await jwt.verify(token, secretKey, (e , decoded) => {
      req.app.locals.payload=decoded;
      if(e){
        verify = true;
        res.status(401).json({'message': 'Failed to Verify Access Token'});
        return;
      }
    });
    if(verify){
      return
    }
    next();
  }


module.exports = verifyToken