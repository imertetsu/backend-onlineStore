const express = require('express');
const ProductService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res, next) =>{
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/filter', (req, res) =>{
  res.send('yo soy un filter')
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) =>{
  //esta es una forma de declarar de ECMAJS donde nos dice que de todo lo que
  //nos vaya a devolver req.params solo nos interesa id
  //const {id} = req.params;
  try {
    const id = req.params.id;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res, next)=>{
  try {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'), async (req, res, next)=>{
    try {
      const id = req.params.id;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error)
    }
});

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'), async (req, res, next)=>{
  try {
    const id = req.params.id;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next)=>{
  try {
    const id = req.params.id;
    const deleteProduct = await service.delete(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
