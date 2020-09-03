const User = require('../db/models/User');
const Bcrypt = require('bcryptjs');
const { update } = require('../db/models/User');
const e = require('express');

module.exports = {
  // findUsers: async (req, res, next) => {
  //   try {
  //     const users = await User.find({});
  //     res.json(users);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
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
  updateUser: async (req, res, next) => {
    try {
      const {
        date,
        username,
        financeUpdate,
        financeIdx,
        symptomUpdate,
        symptomsIdx,
        flowUpdate,
        flowIdx
      } = req.body;

      const foundUser = await User.findOne({ username: req.params.username });

      if (financeIdx) {
        if (financeUpdate.length) {
          foundUser.financial[financeIdx].purchases = financeUpdate
        }
        else {
          foundUser.financial.splice(financeIdx, 1)
        }
      } else if (financeUpdate.length) {
        const financeObj = {
          date,
          purchases: financeUpdate
        }
        User.updateOne({
          _id: foundUser._id
        },{
          $push: {
            financial: financeObj
          }}).exec()
      }

      if (symptomsIdx) {
        if (symptomUpdate.length) {
          foundUser.symptomTags[symptomsIdx].symptoms = symptomUpdate
        } else {
          foundUser.symptomTags.splice(symptomsIdx, 1)
        }
      } else if (symptomUpdate.length) {
        const symptomsObj = {
          date,
          symptoms: symptomUpdate
        }
        User.updateOne({
          _id: foundUser._id
        },{
          $push: {
            symptomTags: symptomsObj
          }}).exec()
      }

      if (flowIdx) {
        if (flowUpdate !== undefined) {
          foundUser.period[flowIdx].typeOfFlow = flowUpdate
        } else {
          foundUser.period.splice(flowIdx, 1)
        }
      } else if (flowUpdate) {
        const periodObj = {
          date,
          typeOfFlow: flowUpdate
        }
        User.updateOne({
          _id: foundUser._id
        },{
          $push: {
            period: periodObj
        }}).exec()
      }

      await foundUser.save()

      const updatedUser = await User.findOne({
        username: req.params.username,
      });

      res.json(updatedUser)
    } catch (err) {
      next(err);
    }
  },
  updateViews: async (req, res, next) => {
    const { name, bool } = req.body
    const username = req.params.username
    const update = {}
    if (name === "period") update.periodTracking = bool
    if (name === "symptom") update.symptomTracking = bool
    if (name === "finance") update.financialTracking = bool

    const foundUser = await User.findOneAndUpdate(
      {username},
      update,
      {
        upsert: true,
        runValidators: true
      }
    )
    await foundUser.save()
    const updatedUser = await User.findOne({username});
    res.json(updatedUser)
  },
  //login?
  loginUser: async (req, res, next) => {
    try {
      const authUser = await User.findOne({
        email: req.body.email,
      }); // .exec() ?
      console.log('authUser', authUser);

      if (!Bcrypt.compareSync(req.body.password, authUser.password)) {
        res.sendStatus(400);
      } else {
        req.login(authUser, (err) => (err ? next(err) : res.json(authUser))); //works without BCrypt
      }

      // console.log('authUser', authUser);
    } catch (err) {
      next(err);
    }
  },
  //signup?
  signUpUser: async (req, res, next) => {
    let {
      name,
      email,
      username,
      password,
      pronouns,
      avgLengthOfCycle,
    } = req.body;
    password = Bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password,
      pronouns,
      avgLengthOfCycle,
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
    res.json(req.user);
  },
  logoutUser: async (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  },
};

// date validation within arrays - map through array, and combine objects if date appears multiple times
