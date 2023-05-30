//const {faker} = require('@faker-js/faker');
const boom = require('boom');
//const pool = require('../libs/postgres.pool');
//const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

class ProductService{

  constructor(){}

  /*generate(){
    const size = req.query.size;
    const limit = size || 10;
    for (let i = 0; i < 5; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }*/

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(){
    //Este codigo es para hacer la conexion por POOL
    /*const query = 'select * from tasks';
    const respta = this.pool.query(query);
    return (await respta).rows;*/

    /*const query = 'select * from tasks';
    const [data, metadata] = await sequelize.query(query);
    return data;*/
    const products = await models.Product.findAll({
      include: ['category']
    });
    return products;
  }

  async findOne(id){
    /*const product = this.products.find(product => product.id === id);
    if(!product){
      throw boom.notFound('product not found');

    }else{
      if(product.isBlock){
      throw boom.conflict('product is blocked');
      }else{
        return product;
      }
    }*/
    const product = await models.Product.findByPk(id);
    if(!product){
      throw boom.notFound('Product not found');
    }else{
      return product;
    }
  }

  async update(id, changes){
    const product = await this.findOne(id);
    const respt = await product.update(changes);
    return respt;
  }
  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;
