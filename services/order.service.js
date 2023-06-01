const boom = require('boom');

const { models } = require('./../libs/sequelize');

class OrderService {
	constructor() {
	}

	async create(data) {
		const newOrder = await models.Order.create(data);
		return newOrder;
	}

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
		return newItem;
  }

	async find() {
		const orders = await models.Order.findAll();
    return orders;
	}

  async findByUser(userId){
    const orders = await models.Order.findAll({
      include: [
				{
					association: 'customer',
					include: ['user'],
				}, 'items'
			],
      where: {
        //esta es la manera de obtener las ordenes de un usuario a traves de las asociaciones, en este caso userId no esta relacionado directamente con
        //orders entonces utilizamos nuestra relacion con customer la cual esta relacionado con orders
        '$customer.user.id$': userId
      }
    });
    return orders;
  }

  async getCustomerId(userId){
    const orders = await this.findByUser(userId);
    const customerId = await orders[0].dataValues.customerId;
    console.log("Este es el customer ID "+ customerId);
    return customerId;
  }

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [
				{
					association: 'customer',
					include: ['user'],
				}, 'items'
			],
		});
    if(!order){
      throw boom.notFound('Order not found');
    }else{
      return order;
    }
	}

	async update(id, changes) {
		return {
			id,
			changes,
		};
	}

	async delete(id) {
		return { id };
	}
}

module.exports = OrderService;
