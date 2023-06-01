const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customerRouter = require('./customer.router');
const orderRouter = require('./orders.router');
const authRouter = require('./auth.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRouter);
}

/*router.use('/categories', passport.authenticate('jwt', { session: false }), categoriesRouter); */
module.exports = routerApi;
