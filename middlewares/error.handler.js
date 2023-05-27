
function logErrors(error, request, response, next){
  console.log("--------------------------------------------------------------------------------------------------------------logErrors");
  console.error(error);
  next(error);
}

function boomErrorHandler(error, request, response, next){
  if(error.isBoom){
    const {output} = error;
    response.status(output.statusCode).json(output.payload);
  }else{
    next(error);
  }
}
function queryErrorHandler(error, req, res, next){
  console.log("--------------------------------------------------------------------------------------------------------------");
  if(error.errors){
    res.status(500).json({
      error: error.parent.detail,
      message: error.errors[0].message
    });
  }else{
    next(error)
  }
}
function foreignKeyErrorHandler(error, req, res, next){
  console.log("--------------------------------------------------------------------------------------------------------------");
  if(error.parent){
    res.status(500).json({
      error: error.parent,
      message: error.parent.detail
    });
  }else{
    next(error)
  }
}

/*function errorHandler(error, request, response, next){
  console.log("errorHandler", error);
  response.status(500).json({
    message: error.message,
    stack: error.stack
  });
  next(error);
}*/

module.exports = {logErrors, boomErrorHandler, queryErrorHandler, foreignKeyErrorHandler}
