const {Model, DataTypes, Sequelize} = require('sequelize');

//nombre de la tabla
const USER_TABLE = 'users';
//define la estructura de la base de datos
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    //nombre de variable en la base de datos, como buena practica
    field: 'create_at',
    //este seria el varlor que se le asigna por defecto
    defaultValue: Sequelize.NOW
  }
}

class User extends Model{
  static assocciate(){
    //assocciate
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      //son como crear campos por defecto como actualizacion y creacion
      timestamps: false,
    }
  }
}

module.exports = {USER_TABLE, UserSchema, User};
