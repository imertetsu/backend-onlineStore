const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {logErrors, boomErrorHandler, queryErrorHandler,
      foreignKeyErrorHandler, bodyErrorHandler } = require('./middlewares/error.handler.js');
const { checkApiKey, checkRoles } = require('./middlewares/auth.handler');
const passport = require('./utils/auth/index');
//const randomName = faker.name.findName();

const app = express();
const port = process.env.PORT || 3000;

const { swaggerDocs } = require('./utils/swagger');


const whiteList = ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:4200','http://localhost:3000'];
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
  res.write('Availables routes to make GET, POST, PUT, DELETE\n');
  res.write('https://backendstore.fly.dev/api/v1/products\n');
  res.write('https://backendstore.fly.dev/api/v1/categories\n');
  res.end();
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


app.listen(port, '0.0.0.0',() => {
  console.log(`mi port ${port}`);
  //swaggerDocs(app, port);
});
