const jwt = require('jsonwebtoken');

function generateToken(user) {
    // You can include any user data you want to include in the payload
    const payload = {
      id: user.id,
      username: user.username
    };
  
    return jwt.sign(payload, process.env.jwtKey, { expiresIn: '48h' });
}  

module.exports ={
    generateToken
}