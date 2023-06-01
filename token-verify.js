const jwt = require('jsonwebtoken');
const token = require('./token-sign');

const secret = 'myCat';

function verfyToken(token, secret){
  return jwt.verify(token, secret);
}

const payload = verfyToken(token, secret);
console.log(payload);
