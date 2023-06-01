const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
//const { checkApiKey } = require('../middlewares/auth.handler');


//A la hora de hacer login generamos el token
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) =>{
  try {
    //res.redirect('/');
    const user = req.user;
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.signature);
    res.json({
      user,
      token: token
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
