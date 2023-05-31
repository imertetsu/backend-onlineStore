const boom = require('boom');
const { config } = require('../config/config');

const API_KEY = config.apiKey;

function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];
  if(apiKey === API_KEY){
    next();
  }else{
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey };
