const boom = require('boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor(){}

  async create(data){
    //aca por ejemplo utilizamos models y luego el modelo que declaramos en nuestro Customer model
    const newCustomer = await models.Customer.create(data, {
      //con esto tambien podemos crear el usuario dentro del customer
      include: ['user']
    });
    return newCustomer;
  }

  async find(){
    const allCustomers = await models.Customer.findAll({
    //Customer puede tener relacion a otras tablas por eso se lo coloca dentro de un arreglo
    //a la hora de crear el modelo Customer y relacionar a User, this.belongsTo(models.User, { as: 'user'}); ese nombre se coloca aca
      include: ['user']
    });
    return allCustomers;
  }
  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      //el thow lanza el error, sin eso solo invocas
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  async update(id, changes){
    const customer = await this.findOne(id);
    const rspt = await customer.update(changes);
    return rspt;
  }
  async deleteOne(id){
    const customer = await this.findOne(id);
    await customer.destroy();
    return {id};
  }
  async deleteAll(){
    await models.Customer.destroy({
      truncate: true
    });
    return { message: "Sucessful Deleted" };
  }
}

module.exports = CustomerService;
