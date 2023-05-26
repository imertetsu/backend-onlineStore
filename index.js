const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {logErrors, boomErrorHandler, queryErrorHandler} = require('./middlewares/error.handler.js');
//const randomName = faker.name.findName();

const app = express();
const port = 3000;
//const port = process.env.PORT || 3000;


const whiteList = ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:5500'];
const options = {
  origin: (origin, callback) =>{
    if(whiteList.includes(origin)|| !origin){
      callback(null, true);
    }else{
      callback(new Error('no permitido'), false);
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
app.use(queryErrorHandler);

//--------------------------------------------------------------------------
/*app.listen(port, () =>{
  console.log("mi port " + port);
});*/

app.listen(port, () => console.log(`mi port ${port}`));

