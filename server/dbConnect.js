const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('../secrets.js');

const mongoDbUsername = process.env.MONGO_DB_USERNAME;
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;

const MONGODB_URI = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.ts2fv.mongodb.net/test?retryWrites=true&w=majority`;

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
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});
