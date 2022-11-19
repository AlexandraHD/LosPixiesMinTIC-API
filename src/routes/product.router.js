const { Router } = require('express');

const { Product } = require('../controllers');

const router = Router();

router.route('/').get(Product.findAll).post(Product.create);

router
  .route('/:productId')
  .get(Product.findById)
  .put(Product.update)
  .delete(Product.deleteProduct);

module.exports = router;
