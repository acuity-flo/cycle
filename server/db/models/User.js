const mongoose = require('mongoose');
const crypto = require('crypto');
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
  // password: {}, //pasport
  pronouns: {
    type: String,
    enum: ['she/her/hers', 'they/them/theirs', 'he/him/his'],
  },
  financial: [
    {
      date: { type: Date, default: Date.now },
      item: {
        type: String,
        enum: ['prescription', 'sanitary products', 'doctor', 'other'],
      }, // selectable list of strings to store into an array to be able to choose multiple
      cost: { type: Number },
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
  symptom: {
    mood: [
      {
        date: { type: Date, default: Date.now },
        typeOfMood: {
          type: String,
          enum: ['stressed', 'motivated', 'calm', 'unmotivated'],
        },
      }, // selectable list of strings to store into an array to be able to choose multiple
    ], //dropdown?
    emotion: [
      {
        date: { type: Date, default: Date.now },
        typeOfEmotion: {
          type: String,
          enum: ['happy', 'sad', 'angry', 'frustrated', 'anxious'],
        },
      },
    ], // selectable list of strings to store into an array to be able to choose multiple
    pain: [
      {
        date: { type: Date, default: Date.now },
        typeOfPain: { type: String, enum: ['cramp', 'headache', 'back'] },
      },
    ], // selectable list of strings to store into an array to be able to choose multiple
    other: [
      {
        date: { type: Date, default: Date.now },
        typeOther: {
          type: String,
          enum: [
            'nausea',
            'bloating',
            'indigestion',
            'fatigue',
            'snacky',
            'PMS',
          ], // selectable list of strings to store into an array to be able to choose multiple
        },
      },
    ],
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

const User = mongoose.model('User', userSchema);

// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

module.exports = User;

// demographic: {
//   idenfity: {type: String},
//   race: {type: String, enum: []},
//   income: {type: String, enum: ['0-15','15-30k', '30-45', '45-60', '' ]},
//   city: {},
// },
