'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');
const { ORDER_TABLE, OrderSchema } = require('../models/order.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
