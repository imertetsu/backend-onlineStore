const express = require('express');
const router = express.Router();
const passport = require('passport');
//const { checkApiKey } = require('../middlewares/auth.handler');



router.post('/login', passport.authenticate('local', { session: false }), async (req, res, next) =>{
  try {
    //res.redirect('/');
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
