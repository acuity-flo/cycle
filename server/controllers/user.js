const User = require('../db/models/User');
const Bcrypt = require('bcryptjs');

module.exports = {
  findUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
  findOneUser: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({
        username: req.params.username,
      });
      res.json(foundUser);
    } catch (err) {
      next(err);
    }
  },
  // can update but seems to replace fields
  updateUser: async (req, res, next) => {
    try {
      console.log("IM THE REQ.BODY", req.body)
      const { period, symptom, finance } = req.body;
      const foundUser = await User.findOneAndUpdate(
        { username: req.params.username },
        { period, symptom, finance},
        {
          upsert: true,
          runValidators: true,
        }
      );
      const updatedUser = await foundUser.save()
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
  //login?
  loginUser: async (req, res, next) => {
    console.log('req.body in route',req.body)
    try {
      const authUser = await User.findOne({
        email: req.body.email
      }) // .exec() ?
      console.log('authUser', authUser);

      if(!Bcrypt.compareSync(req.body.password, authUser.password)){
        res.sendStatus(400)
      } else {
        req.login(authUser, (err) => (err ? next(err) : res.json(authUser)));  //works without BCrypt
      }

      // console.log('authUser', authUser);

    } catch (err) {
      next(err);
    }
  },
  //signup?
  signUpUser: async (req, res, next) => {
    let { name, email, username, password, pronouns } = req.body;
    password = Bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password,
      pronouns,
    });

    try {
      await newUser.save();
      console.log('new user', newUser);
      res.json(newUser);
    } catch (err) {
      next(err);
    }
  },
  authMe: async (req, res, next) => {
    res.json(req.user)
  },
  logoutUser: async (req, res) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
  }
};

// date validation within arrays - map through array, and combine objects if date appears multiple times
