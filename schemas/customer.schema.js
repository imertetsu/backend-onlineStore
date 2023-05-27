const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(25);
const lastName = Joi.string().max(25);
const phoneNumber = Joi.number().integer();
const userId = Joi.number().integer();
const { createUserSchema } = require('./user.schema');

//const createdAt = Joi.string().;

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phoneNumber: phoneNumber.required(),
  user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phoneNumber: phoneNumber,
  userId: userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {createCustomerSchema, updateCustomerSchema, getCustomerSchema};
