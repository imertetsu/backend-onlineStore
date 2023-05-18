
const boom = require('boom');
//const getConnection = require('../libs/postgres');

const { models } = require('../libs/sequelize');

class UserService{

  constructor(){

  }

  async create(data){
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find(){
    const rspt = await models.User.findAll();
    return rspt;

  }
  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  }
  async update(id, changes){
    const user = await this.findOne(id);
    const rspt = await user.update(changes);
    return rspt;
  }
  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return {id};
  }
}

module.exports = UserService;