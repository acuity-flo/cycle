const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const passport = require('passport')
const PORT = process.env.PORT || 4000

module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')

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

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(passport.initialize())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))


// static file-serving middleware
// likely not needed because react scripts serves files from client src and build is what is served otherwise
// app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
// })

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, () =>
  console.log(`Mixing it up on port ${PORT}`)
)
