const express = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createUserSchema, updateUserSchema, getUserSchema} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

//se coloca esto en el end point => users?limit=10&offset=200
router.get('/', async (req, res) =>{
  /*const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('No existen parametros');
  }*/
  const users = await service.find();
  res.json(users);
});

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) =>{
  //esta es una forma de declarar de ECMAJS donde nos dice que de todo lo que
  //nos vaya a devolver req.params solo nos interesa id
  //const {id} = req.params;
  try {
    const id = req.params.id;
    const user = await service.findOne(id);
    res.json(user);
    /*else{
      res.status(400).json(product);
    }*/
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res, next)=>{
  try{
    const body = req.body;
    const user = await service.create(body);
    res.status(201).json(user);
  }catch(error){
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'), async (req, res)=>{
  const id = req.params.id;
  const body = req.body;
  //products.push(body);
  const user = await service.update(id, body);
  res.json({
    message: "patched",
    data: user,
    id
  });
});


router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'), async (req, res, next)=>{
  let user;
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(body.name);
    user = await service.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next)=>{
  try {
    const id = req.params.id;
    //const body = req.body;
    const users = await service.delete(id);
    res.json({id});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
