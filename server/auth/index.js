const router = require('express').Router()

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    // const user = await User.findOne({
    //   where: {
    //     email: req.body.email
    //   },
    //   include: {
    //     model: Order
    //   }
    // })
    // console.log(user)
    // if (!user) {
    //   console.log('No such user found:', req.body.email)
    //   res.status(401).send('Wrong username and/or password')
    // } else if (!user.correctPassword(req.body.password)) {
    //   console.log('Incorrect password for user:', req.body.email)
    //   res.status(401).send('Wrong username and/or password')
    // } else {
    //   req.login(user, err => (err ? next(err) : res.json(user)))
    // }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {name, email, username, password, pronouns} = req.body
    // const user = await User.create({
    //   email,
    //   password,
    //   shoeSize,
    //   firstname,
    //   access: 'user',
    //   lastname
    // })
    // req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  // req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})
