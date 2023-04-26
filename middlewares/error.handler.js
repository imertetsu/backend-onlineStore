function logErrors(error, request, response, next){
  console.log("logErrors");
  console.error(error);
  next(error);
}

function errorHandler(error, request, response, next){
  console.log("errorHandler");
  response.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

function boomErrorHandler(error, request, response, next){
  if(error.isBoom){
    const {output} = error;
    response.status(output.statusCode).json(output.payload);
  }else{
    next(error);
  }

}

module.exports = {logErrors, errorHandler, boomErrorHandler}
