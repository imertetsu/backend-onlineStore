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
/* esta es una opcion para solo acceder a las rutas como ADMIN
function checkAdminRole(req, res, next){
  const user = req.user;
  console.log(user);
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.forbidden('user not authorized'));
  }
}*/
function checkRoles(roles){
  return (req, res, next) => {
    const user = req.user;
    //console.log(user);
    //aca verificamos que en el arreglo de roles incluya el rol del usuario
    if(roles.includes(user.role)){
      next();
    }else{
      next(boom.forbidden('user not authorized'));
    }
  }

}


module.exports = { checkApiKey, checkRoles };
