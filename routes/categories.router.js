const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const CategoryService = require('../services/category.service');
const { getCategorySchema, updateCategorySchema, createCategorySchema} = require('../schemas/category.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const service = new CategoryService();

router.get('/', async (req, res, next) =>{
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) =>{
  //esta es una forma de declarar de ECMAJS donde nos dice que de todo lo que
  //nos vaya a devolver req.params solo nos interesa id
  //const {id} = req.params;
  try {
    const id = req.params.id;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  //aca le decimos que necesita la autenticacion por token, entonces para postear categorias necesitas el token
  passport.authenticate('jwt', { session: false }),
  //de esta forma se utilizan los middlewares
  checkRoles(['admin']),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next)=>{
  try {
    const body = req.body;
    const category = await service.create(body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  //de esta forma se utilizan los middlewares
  checkRoles(['admin']),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'), async (req, res, next)=>{
    try {
      const id = req.params.id;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error)
    }
});

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  //de esta forma se utilizan los middlewares
  checkRoles(['admin']),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'), async (req, res, next)=>{
  let product;
  try {
    const id = req.params.id;
    const body = req.body;
    product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(getCategorySchema, 'params'), async (req, res, next)=>{
  try {
    const id = req.params.id;
    const deleteCategory = await service.delete(id);
    res.json(deleteCategory);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
