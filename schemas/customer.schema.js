const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(25);
const lastName = Joi.string().max(25);
const phoneNumber = Joi.number().integer();
const userId = Joi.number().integer();
const email = Joi.string().max(25).email();
const password = Joi.string().min(4);

//const createdAt = Joi.string().;

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phoneNumber: phoneNumber.required(),
  user: {
    email: email.required(),
    password: password.required()
  },
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
