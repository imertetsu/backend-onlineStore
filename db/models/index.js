//este archivo se encarga de enviar la conexion a los modelos para que haga el mapeo de datos
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

//esta funcion tambien recibe la conexion 'sequelize'
function setupModels(sequelize){
  //este modelo 'User' sigue el esquema 'UserSchema', luego enviamos la configuracion, con el metodo estatico no se necesita instanciar
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  //con esto estamos ejecutando la asociacion de ambos. EL ORDEN SI IMPORTA!
  User.assocciate(sequelize.models);
  Customer.assocciate(sequelize.models);
}

module.exports = setupModels;
