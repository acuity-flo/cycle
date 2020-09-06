const router = require('express').Router();
const userController = require('../controllers/user');

router
  .route('/:username')
  .get(userController.findOneUser)
  .put(userController.updateUser);

router.route('/:username/views/').put(userController.updateViews);
router.route('/:username/profile/').put(userController.updateProfile);
router.route('/:username/password/').put(userController.updatePassword);

module.exports = router;
