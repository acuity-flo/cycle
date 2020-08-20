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
        req.body
      );
      res.json(foundUser);
    } catch (err) {
      next(err);
    }
  },
};
