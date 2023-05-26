//este archivo se encarga de enviar la conexion a los modelos para que haga el mapeo de datos
const {User, UserSchema} = require('./user.model');

//esta funcion tambien recibe la conexion 'sequelize'
function setupModels(sequelize){
  //este modelo 'User' sigue el esquema 'UserSchema', luego enviamos la configuracion, con el metodo estatico no se necesita instanciar
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
