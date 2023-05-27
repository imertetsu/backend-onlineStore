const { Model, DataTypes, Sequelize} = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName:{
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phoneNumber:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'phone_number',
    unique: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Customer extends Model {
  static assocciate(models){
    //assocciate
    //tiene una relacion con User     User (has)-----> <--(belongsTo) Customers    User has Customers, Customers belongsTo User
    this.belongsTo(models.User, { as: 'user'});
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      //son como crear campos por defecto como actualizacion y creacion
      timestamps: false,
    }
  }
}
module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
