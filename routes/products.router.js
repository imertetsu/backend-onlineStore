const express = require('express');
const ProductService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();


router.get('/', async (req, res) =>{
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) =>{
  res.send('yo soy un filter')
});

router.get('/:productID', validatorHandler(getProductSchema, 'params'), async (req, res, next) =>{
  //esta es una forma de declarar de ECMAJS donde nos dice que de todo lo que
  //nos vaya a devolver req.params solo nos interesa id
  //const {id} = req.params;
  try {
    const id = req.params.productID;
    const product = await service.findOne(id);
    res.json(product);
    /*else{
      res.status(400).json(product);
    }*/

  } catch (error) {
    next(error);
  }

});

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res)=>{
  const body = req.body;
  const product = await service.create(body);
  res.status(201).json(product);

});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'), async (req, res)=>{
  const id = req.params.id;
  const body = req.body;
  //products.push(body);
  res.json({
    message: "patched",
    data: body,
    id
  });

});


router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'), async (req, res)=>{
  let product;
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(body.name);
    product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json(product);
  }
});


router.delete('/:id', async (req, res)=>{
  const id = req.params.id;
  //const body = req.body;
  const products = await service.delete(id);
  if(products.message === "deleted"){
    res.json(products);
  }else{
    res.status(400).json(products);
  }
});

module.exports = router;
