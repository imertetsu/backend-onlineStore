const boom = require('boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {

  constructor(){}

  async create(data){
    //aca por ejemplo utilizamos models y luego el modelo que declaramos en nuestro Customer model
    const hash = await bcrypt.hash(data.user.password,5);
    const newCustomer = await models.Customer.create({
      ...data,
      user: {
        ...data.user,
        password: hash
      }}, {
      //con esto tambien podemos crear el usuario dentro del customer
      include: ['user']
    });
    //con esto excluimos el password para que no se muestre
    delete newCustomer.dataValues.user.dataValues.password;
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
    const customer = await models.Customer.findByPk(id, {
      include: ['user']
    });
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
