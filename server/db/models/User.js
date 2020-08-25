const mongoose = require('mongoose');
const crypto = require('crypto');
const Bcrypt = require('bcryptjs')
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
    // required: true
  }, 
  // salt: {     //password tests
  //   type: String,
  //   required: true
  // },
  pronouns: {
    type: String,
    enum: ['she/her/hers', 'they/them/theirs', 'he/him/his'],
  },
  financial: [
    {
      date: { type: Date, default: Date.now },
      typeOfPurchase: [
        {
          type: String,
          enum: ['prescription', 'sanitary products', 'doctor', 'other'],
          cost: { type: Number }
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
  symptom: {
    mood: [
      {
        date: { type: Date, default: Date.now },
        typeOfMood: [
          {
            type: String,
            enum: ['stressed', 'motivated', 'calm', 'unmotivated'],
          },
        ],
      }, // selectable list of strings to store into an array to be able to choose multiple
    ], //dropdown?
    emotion: [
      {
        date: { type: Date, default: Date.now },
        typeOfEmotion: [
          {
            type: String,
            enum: ['happy', 'sad', 'angry', 'frustrated', 'anxious'],
          },
        ],
      },
    ], // selectable list of strings to store into an array to be able to choose multiple
    pain: [
      {
        date: { type: Date, default: Date.now },
        typeOfPain: [
          {
            type: String,
            enum: ['cramp', 'headache', 'back'],
          },
        ],
      },
    ], // selectable list of strings to store into an array to be able to choose multiple
    other: [
      {
        date: { type: Date, default: Date.now },
        typeOther: [
          {
            type: String,
            enum: [            
            'nausea',
            'bloating',
            'indigestion',
            'fatigue',
            'snacky',
            'PMS'],
          },
        ]
      },
    ],
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });


// const User = mongoose.model('User', userSchema);

// User.path('symptom')
//   .schema.path('mood')
//   .validate((moodInput) => {
//     const moodsArr = ['stressed', 'motivated', 'calm', 'unmotivated'];
//     console.log('moodInput in validator', moodInput);
//     // if (!moodsArr.includes(moodInput.typeOfMood)) {
//     //   return false;
//     // }
//   }, 'please select one of the moods');

// userSchema.methods.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

// userSchema.methods.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64')
// }

// userSchema.methods.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

// //util function 
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

// //Mongoose Middlewares 
// userSchema.pre('save', setSaltAndPassword)

// userSchema.pre('updateOne', { document: true, query: false }, setSaltAndPassword)

// userSchema.pre('updateMany', setSaltAndPassword)

// userSchema.pre('insertMany', setSaltAndPassword)


// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

const User = mongoose.model('User', userSchema);

module.exports = User;

// demographic: {
//   idenfity: {type: String},
//   race: {type: String, enum: []},
//   income: {type: String, enum: ['0-15','15-30k', '30-45', '45-60', '' ]},
//   city: {},
// },
