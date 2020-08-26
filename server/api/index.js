const User = require('../db/models/User');
const router = require('express').Router();
const userController = require('../controllers/user');

router
  .route('/:username')
  .get(userController.findOneUser)
  .put(userController.updateUser);

router.route('/').get(userController.findUsers).post(userController.signUpUser);

module.exports = router;
