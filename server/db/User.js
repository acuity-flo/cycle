const mongoose = require('mongoose');
const crypto = require('crypto');
const Bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    require: 'Please Supply An Email Address',
  },
  password: {
    type: String,
  },
  pronouns: {
    type: String,
    enum: ['she/her/hers', 'they/them/theirs', 'he/him/his'],
  },
  avgLengthOfCycle: {
    type: Number,
    default: 28,
  },
  periodTracking: { type: Boolean, default: false },
  symptomTracking: { type: Boolean, default: false },
  financialTracking: { type: Boolean, default: false },
  financial: [
    {
      date: { type: Date, default: Date.now },
      purchases: [
        {
          typeOfPurchase: {
            type: String,
            enum: ['prescription', 'sanitary products', 'doctor', 'other'],
          },
          cost: { type: Number },
        },
      ],
    },
  ],
  period: [
    {
      date: { type: Date, default: Date.now },
      typeOfFlow: {
        type: String,
        enum: ['light', 'medium', 'heavy', 'spotting'],
        default: null,
      },
    },
  ],
  symptomTags: [
    {
      date: { type: Date, default: Date.now },
      symptoms: [
          {
          symptomName: {
            type: String
          },
          category: {
            type: String,
            enum: ['mood', 'emotion', 'pain', 'physical', 'custom'],
            default: 'custom',
          },
        },
      ],
    },
  ],
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

const User = mongoose.model('User', userSchema);


module.exports = User;
