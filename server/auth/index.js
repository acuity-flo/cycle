const router = require('express').Router();
// const User = require('../db/models/User')
const userController = require('../controllers/user');

module.exports = router;

router.route('/login').post(userController.loginUser);

router.route('/signup').post(userController.signUpUser);

router.route('/me').get(userController.authMe);

router.route('/logout').post(userController.logoutUser)

