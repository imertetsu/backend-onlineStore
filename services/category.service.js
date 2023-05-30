const boom = require('boom');
//const getConnection = require('../libs/postgres');
//se crea un espacio reservado donde se crean todos los modelos, y lo podemos utilizar con nuestros modelos
const  { models } = require('../libs/sequelize');

class CategoryService{

  constructor(){
  }

  async create(data){
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(){
    const rspt = await models.Category.findAll();
    return rspt;
  }

  async findOne(id){
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category){
      //el thow lanza el error, sin eso solo invocas
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes){
    const category = await this.findOne(id);
    const rspt = await category.update(changes);
    return rspt;
  }
  async delete(id){
    const category = await this.findOne(id);
    await category.destroy();
    return {id};
  }
}

module.exports = CategoryService;
