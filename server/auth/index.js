const router = require('express').Router();
// const User = require('../db/models/User')
const userController = require('../controllers/user');

module.exports = router;

router.route('/login').post(userController.loginUser);

router.route('/signup').post(userController.signUpUser);

// router.post('/signup', async (req, res, next) => {
//   try {
//     const { name, email, username, password, pronouns } = req.body;
//     // const user = await User.create({
//     //   email,
//     //   password,
//     //   shoeSize,
//     //   firstname,
//     //   access: 'user',
//     //   lastname
//     // })
//     // req.login(user, err => (err ? next(err) : res.json(user)))
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists');
//     } else {
//       next(err);
//     }
//   }
// });

router.post('/logout', (req, res) => {
  req.logout();
  // req.session.destroy()
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});
