const express = require('express');
const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new CustomerService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  async(req, res, next) => {
  try{
    const customers = await service.find();
    res.json(customers);
  }catch(error){
    next(error);
  }
});
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(getCustomerSchema, 'params'),
  async(req, res, next) => {
  try{
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json(customer);
  }catch(error){
    next(error);
  }
});
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(createCustomerSchema, 'body'), async(req, res, next) => {
  try {
    const body = req.body;
    const customer = await service.create(body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});
router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(updateCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async(req, res, next) =>{
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.update(id, body);
    res.json(customer);
  } catch (error) {
      next(error);
  }
});
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(updateCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async(req, res, next) =>{
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.update(id, body);
    res.json(customer);
  } catch (error) {
      next(error);
  }
});
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(getCustomerSchema, 'params'),
  async(req, res, next) =>{
  try {
    const { id } = req.params;
    const respt = await service.deleteOne(id);
    res.json(respt);
  } catch (error){
      next(error);
  }
});
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  async(req, res, next) =>{
  try {
    const respt = await service.deleteAll();
    res.json(respt);
  } catch (error) {
      next(error);
  }
});

module.exports = router;
