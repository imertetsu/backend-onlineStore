const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthService = require('../services/auth.service');
//const { checkApiKey } = require('../middlewares/auth.handler');
const service = new AuthService();

//A la hora de hacer login generamos el token
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) =>{
  try {
    //res.redirect('/');
    const user = req.user;
    const respt = service.signToken(user);
    res.json(respt);
  } catch (error) {
    next(error);
  }
});

router.post('/recovery',
  passport.authenticate('jwt', { session: false }),
  async(req, res, next)=>{
    try {
      const { email } = req.body;
      const rta = await service.sendMailRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });

router.post('/change-password',
  passport.authenticate('jwt', { session: false }),
  async(req, res, next) =>{
  try {
    const { token, newPassword } = req.body;
    const rpta = await service.changePassword(token, newPassword);
    res.json(rpta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
