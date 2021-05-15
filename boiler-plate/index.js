const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const { User } = require('./models/User')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.post('/register', (req, res)=>{
  // get information from clinet, insert infromation into database
  const user = new User(req.body)
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})