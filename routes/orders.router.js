const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const boom =require('boom');

const router = express.Router();
const service = new OrderService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  async(req, res, next) =>{
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
	async (req, res, next) => {
		try {
			const user = req.user;
      const customerId = await service.getCustomerId(user.sub);
			const newItem = await service.create({
        customerId: customerId});
			res.status(201).json(newItem);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/add-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'customer']),
	validatorHandler(addItemSchema, 'body'),
	async (req, res, next) => {
		try {
      const body = req.body;
      const user = req.user;
      const customerOrders = await service.findByUser(user.sub);


      const customerOrder = customerOrders.find(order => order.id === body.orderId);
      if(customerOrder){
        const newItem = await service.addItem(body);
        res.status(201).json(newItem);
      }else{
        throw boom.unauthorized();
      }
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
