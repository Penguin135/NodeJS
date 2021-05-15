const express = require('express')
const app = express()
const port = 5000

const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./models/User')

const mongoose = require('mongoose')
const { response } = require('express')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.post('/register', (req, res) => {
  // get information from clinet, insert infromation into database
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {
  // 1. find email in database
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user)
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'no matched email'
      })
    }
    // 2. if email exist in database, confirm password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: 'password is not correct' })
      // 3. if pass word is matched, create token
      user.genToken((err, user) => {
        if (err) return res.status(400).send(err)

        // save token to cookie
        res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userid: user._id })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})