const User = require('../db/models/User');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    console.log('in the get');
    const myUser = await User.find({});
    console.log('user', myUser);
    res.json(myUser);
  } catch (e) {
    console.log('in the catch');
    next(e);
  }
});

module.exports = router;
