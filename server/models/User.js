const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const user = new Schema({
  basicInfo: {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid Email Address'],
      require: 'Please Supply An Email Address',
    },
    username: { type: String, required: true, unique: true },
    password: {},
  },
  // demographic: {
  //   idenfity: {type: String},
  //   race: {type: String, enum: []},
  //   income: {type: String, enum: ['0-15','15-30k', '30-45', '45-60', '' ]},
  //   city: {},
  // },
  financial: [
    {
      date: { type: Date, default: Date.now },
      item: {
        type: String,
        enum: ['prescription', 'sanitary products', 'doctor', 'other'],
      },
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
      },
    ], //dropdown?
    emotion: [
      {
        date: { type: Date, default: Date.now },
        typeOfEmotion: {
          type: String,
          enum: ['happy', 'sad', 'angry', 'frustrated', 'anxious'],
        },
      },
    ],
    pain: [
      {
        date: { type: Date, default: Date.now },
        typeOfPain: { type: String, enum: ['cramp', 'headache', 'back'] },
      },
    ],
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
          ],
        },
      },
    ],
  },
});

const User = mongoose.model('User', user);

module.exports = User;
