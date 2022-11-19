const { Router } = require('express');

const { User } = require('../controllers');

const router = Router();

router.post('/login', User.login);

router.post('/signup', User.signup);

router.put('/:userId', User.update);

module.exports = router;
