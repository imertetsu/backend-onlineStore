const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler.js');
//const randomName = faker.name.findName();

const app = express();
const port = 3000;

const whiteList = ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:5500'];
const options = {
  origin: (origin, callback) =>{
    if(whiteList.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));


//este es un Middleware para poder recibir un JSON
app.use(express.json());

app.get('/', (req, res) =>{
  res.send('hola mi server en express')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//--------------------------------------------------------------------------
app.listen(port, () =>{
  console.log("mi port " + port);
});


