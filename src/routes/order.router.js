const { Router } = require('express');

const { Order } = require('../controllers');
const { Auth } = require('../middleware');

const router = Router();

router
  .route('/')
  .get(Auth.isAuth, Order.findOrders)
  .post(Auth.isAuth, Order.create);

module.exports = router;
