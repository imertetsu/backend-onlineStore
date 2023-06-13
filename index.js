const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {logErrors, boomErrorHandler, queryErrorHandler,
      foreignKeyErrorHandler, bodyErrorHandler } = require('./middlewares/error.handler.js');
const { checkApiKey, checkRoles } = require('./middlewares/auth.handler');
const passport = require('./utils/auth/index');
//const randomName = faker.name.findName();

const app = express();
const port = 3000;
//const port = process.env.PORT || 3000;


const whiteList = ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:4200'];
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
//aca simplemente invocamos la variable de passport para el uso del local passport
app.use(passport.initialize());



//este es un Middleware para poder recibir un JSON
app.use(express.json());

app.get('/', (req, res) =>{
  res.send('hola mi server en express')
});

app.get('/nueva-ruta',checkApiKey, (req, res) => {
  res.send('hola soy nueva ruta');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(queryErrorHandler);
app.use(foreignKeyErrorHandler);
app.use(bodyErrorHandler);
app.use(checkRoles);

//--------------------------------------------------------------------------
/*app.listen(port, () =>{
  console.log("mi port " + port);
});*/

app.listen(port, () => console.log(`mi port ${port}`));

