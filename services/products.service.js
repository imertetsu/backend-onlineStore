const {faker} = require('@faker-js/faker');
const boom = require('boom');

class ProductService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    /*const size = req.query.size;
    const limit = size || 10;*/
    for (let i = 0; i < 5; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }
  async find(){
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve(this.products);
      }, 3000);

    })

  }
  async findOne(id){
    const product = this.products.find(product => product.id === id);
    if(!product){
      throw boom.notFound('product not found');

    }else{
      if(product.isBlock){
      throw boom.conflict('product is blocked');
      }else{
        return product;
      }
    }

  }
  async update(id, changes){
    let product;
    let oldProduct;
    const index = this.products.findIndex(product => product.id === id);
    if(index !== -1){
      oldProduct = this.products[index];
      product = {
        ...oldProduct,
        ...changes
      };
      this.products[index] = product;
      return product;
    }else{
      throw boom.notFound('product not found');
    }
  }
  async delete(id){
    const index = this.products.findIndex(product => product.id === id);
    if(index!==-1){
      this.products.splice(index, 1);
      return {
        message: "deleted",
        id
      }
    }else{
      throw boom.notFound('product not found');
    }
  }
}

module.exports = ProductService;
