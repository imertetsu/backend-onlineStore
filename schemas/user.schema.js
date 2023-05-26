const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().max(25).email();
const password = Joi.string().min(4);
const role = Joi.string().max(25);

//const createdAt = Joi.string().;

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema};
