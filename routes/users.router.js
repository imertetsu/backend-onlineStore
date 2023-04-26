const express = require('express')

const router = express.Router();


//se coloca esto en el end point => users?limit=10&offset=200
router.get('/', (req, res) =>{
  const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('No existen parametros')
  }
});

module.exports = router;
