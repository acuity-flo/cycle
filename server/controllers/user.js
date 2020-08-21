const User = require('../db/models/User');

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
        email: req.body.email
      })
      console.log('authUser',authUser)
      req.login(authUser, err => (err ? next(err) : res.json(authUser)))
    } catch (err) {
      next(err);
    }
  },
  //signup?
  signUpUser: async (req, res, next) => {
    try {

    } catch (e) {

    }
  }
};
