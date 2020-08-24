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
      const foundUser = await User.findOneAndUpdate(
        { username: req.params.username },
        req.body,
        {
          new: true,
          upsert: true,
        }
      );
      res.json(foundUser);
    } catch (err) {
      next(err);
    }
  },
  //login?
  loginUser: async (req, res, next) => {
    try {
      const authUser = await User.findOne({
        email: req.body.email,
      });
      console.log('authUser', authUser);
      req.login(authUser, (err) => (err ? next(err) : res.json(authUser)));
    } catch (err) {
      next(err);
    }
  },
  //signup?
  signUpUser: async (req, res, next) => {
    const { name, email, username, password, pronouns } = req.body;
    const hash = Bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      hash,
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
