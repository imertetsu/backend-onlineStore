const boom = require('boom');
const bcrypt = require('bcrypt');
//const getConnection = require('../libs/postgres');
//se crea un espacio reservado donde se crean todos los modelos, y lo podemos utilizar con nuestros modelos
//const { models } = require('../libs/sequelize');
const  { models } = require('../libs/sequelize');

class UserService{

  constructor(){

  }

  async create(data){
    //aca por ejemplo utilizamos models y luego el modelo que declaramos en nuestro User model
    const hash = await bcrypt.hash(data.password, 5);
    const newUser = await models.User.create({
      //desestructuramos data y modificamos password
      ...data,
      password: hash
    });
    //funcion JS con esto excluimos el password para que no se muestre
    delete newUser.dataValues.password;
    return newUser;
  }

  async find(){
    const rspt = await models.User.findAll({
      include: ['customer']
    });
    rspt.map(user => {
      delete user.dataValues.password;
    });
    return rspt;
  }
  async findByEmail(email){
    const rspt = await models.User.findOne({
      where: {
        email: email
      }
    });
    return rspt;
  }

  async findOne(id){
    const user = await models.User.findByPk(id, {
      include: ['customer']
    });
    if(!user){
      //el thow lanza el error, sin eso solo invocas
      throw boom.notFound('user not found');
    }
    delete user.dataValues.password;
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
