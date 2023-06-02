const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(4).max(15);
const price = Joi.number().integer().min(10);
const images = Joi.array().items(Joi.string().uri());
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();

const offset = Joi.number().integer();
const limit = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  images: images.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  images: images,
  description,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset: offset.when('limit', {
    is: Joi.number().integer().required(),
    then: Joi.required(),
  }),
  price,
  price_min,
  //si viene price_min, entonces hay que decirle que price_max debe ser requerido,
  price_max: price_max.when('price_min', {
    //si el valor es un entero
    is: Joi.number().integer().required(),
    //entonces ese campo price_max debe ser requerido
    then: Joi.required(),
  }),//el with se utiliza para que ambos dependan de ambos
}).with('limit', 'offset').with('offset','limit')
  .with('price_min', 'price_max').with('price_max','price_min');

module.exports = {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema}
