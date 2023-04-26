const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  res.send('esta es la pagina Categories');
});


router.get('/:categoryID/products/:productID', (req, res) =>{
  const cat_id = req.params.categoryID;
  const prod_id = req.params.productID;

  res.json({
      cat_id,
      prod_id
  });
});

module.exports = router;
