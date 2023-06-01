const {Model, DataTypes, Sequelize} = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	customerId: {
		field: 'customer_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		References: {
			model: CUSTOMER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
  /*total: {
    type: DataTypes.VIRTUAL,
    async get(){
      if(await this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    }
  }*/
};

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {
			as: 'customer',
		});
    //para decirle que es una relacion de muchos a muchos hay que referenciar la tabla ternearia en este caso OrderProduct
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		};
	}
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
