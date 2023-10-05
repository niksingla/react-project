const express = require('express');
const cors = require('cors')
require('./db/config')
const User = require('./db/User')
const Jwt = require('jsonwebtoken');
const UserInfo = require('./db/UserInfo');
const jwtKey = 'react-nik'

const app = express();
const port = 5000

app.use(express.json())
app.use(cors());

const verifyToken = async (req, res, next) => {
  try {
    token = req.headers['authorization'].split(" ")[1]
  }
  catch (e) {
    res.status(401).send({ "error": "No valid token provided" })
    return;
  }
  if (typeof token !== 'undefined') {

    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ "error": "Invalid Token" })
      }
      else {
        next()
      }
    })
  }
  else {
    res.status(401).send({ "error": "No token found" })
  }
}

async function updateUserInfo(user) {
  let user_id = user._id.toString()
  let info = {
    'user_id': user_id,
    'meta_key': '',
    'meta_value': ''
  }

  let userinfo = new UserInfo(info)
  const infosave = await userinfo.save()
}
async function is_super_admin(user) {
  const result = await UserInfo.find({ user_id: user._id.toString() })
  is_admin = result.length > 0
  return is_admin
}


app.get('/users', verifyToken, async (req, res) => {
  const result = await User.find().select('-password')
  data = { users: result }
  if (result) {
    tempArray = []
    for (const [index, user] of result.entries()) {
      const is_admins = await is_super_admin(user)
      if (is_admins) {
        tempArray.push(user)
      }
    }
    data.admin = tempArray
    res.send(data)
  }
})

app.get('/users/:id', verifyToken, async (req, res) => {
  const users = await User.findOne({ _id: req.params.id }).select('-password')
  res.send(users)
})

app.get('/', verifyToken, async (req, res) => {
  result = { "Message": "Api is working fine" }
  res.send(result)
})

app.post('/register', async (req, res) => {
  if (req.body.password && req.body.email && req.body.name) {
    let is_taken = await User.findOne({ email: req.body.email })

    if (!is_taken) {
      let user = new User(req.body)

      let result = await user.save()
      if (result) {
        user = result.toObject()
        //updateUserInfo(user)
        delete result.password
        Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, async (err, token) => {
          if (err) {
            res.send({ 'result': 'something went wrong!' })
          }
          res.send({ user, 'auth': token })
        })
      }
    }
    else {
      res.send({ 'error': 'Email already exists' })
    }
  }
})

app.put('/update', async (req, res) => {

  if (req.body.password1 == '' && req.body.password2 == '') {
    let result = await User.updateOne(
      { _id: req.body._id }, {
        $set:
          { name: req.body.name, email: req.body.email }
    }
    )
    res.send({ "result": result })
    return;
  }
  else if (req.body.password1 === req.body.password2) {
    res.send({error:"New password should be different from the old password"})  
    return;
  }
  res.status(401).send({error:"Something went wrong"})
})

app.post('/signin', async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select('-password')
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, async (err, token) => {
        if (err) {
          res.send({ 'error': 'Invalid token!' })
        }
        res.send({ user, 'auth': token })
      })
    }
    else {
      res.send({ "error": "Invalid credentials" })
    }
  }
  else {
    res.send({ "error": "False request" })
  }
})

app.delete("/delete/:id", async (req, res) => {
  //res.send(req.params.id)
  let result = await User.deleteOne({ _id: req.params.id })
  res.send(result)
})

app.get('/profile/:id', async (req, res) => {
  try {
    result = await User.findOne({ _id: req.params.id }).select('-password')
  }
  catch (err) {
    result = { error: "No profile found" }
  }
  res.send(result)
})

app.listen(port, () => {
  console.log(`Port: ${port}`)
})