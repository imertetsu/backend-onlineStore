const boom = require('boom');

function validatorHandler(schema, property){
  return (request, response, next) => {
    const data = request[property];
    //Al establecer abortEarly en false, se pueden recopilar todos los errores de validación en lugar de detenerse en el primer error.
    const { error } = schema.validate(data, { abortEarly: false});
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}
module.exports = validatorHandler;
