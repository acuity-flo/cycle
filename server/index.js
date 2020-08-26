const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 4000;
const User = require('./db/models/User')

const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('../secrets.js');

const mongoDbUsername = process.env.MONGO_DB_USERNAME;
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;

const MONGODB_URI = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.ts2fv.mongodb.net/test?retryWrites=true&w=majority`;

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI || MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI || MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));

mongoose.connection.on('error', (err) => {
  console.error(
    `something is not working with the mongoose db connection :( ${err.message})`
  );
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection is running boo ya');

  // to see a list of the collections we are connected to in our db

  // mongoose.connection.db.listCollections().toArray(function (err, names) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(names);
  //   }
  // });
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

module.exports = app;

// if (process.env.NODE_ENV !== 'production') require('../secrets');

// passport registration
// passport.serializeUser((user, done) => done(null, user.id))

// passport.deserializeUser(async (id, done) => {
//   try {
//     //input user find w/ mongoose
//     done(null, user) //user
//   } catch (err) {
//     done(err)
//   }
// })

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// logging middleware
app.use(morgan('dev'));

// // body parsing middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));


//express session

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false
  })
)


//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

// static file-serving middleware
// likely not needed because react scripts serves files from client src and build is what is served otherwise
app.use(express.static(path.join(__dirname, '../client/build')))

// any remaining requests with an extension (.js, .css, etc.) send 404

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`🐕 Doggo says let's go to port ${PORT}`));
