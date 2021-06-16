const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  const email = req.body.email
  const pass = req.body.password

  UserModel
    .findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(pass, user.password, (error, result) => {
          if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Error in Server' })
          } else {
            if (result) {
              res.status(201).json(generateToken(user))
            } else {
              res.status(401).json({ msg: 'User and password does not match' })
            }
          }
        })
      } else {
        res.status(401).json({ msg: 'User and password does not match' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.signup = (req, res) => {
  const userData = fillUserData(req)

  bcrypt.hash(userData.password, 10)
    .then(pass => {
      userData.password = pass
      UserModel
        .create(userData)
        .then(user => {
          const newUser = JSON.parse(JSON.stringify(user))
          delete newUser.password
          res.status(201).json(newUser)
        })
        .catch(error => {
          console.log(error)
          res.status(409).json({ msg: 'Something in the request is not correct' })
        })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

function fillUserData (req) {
  const userData = req.body
  delete userData.role
  delete userData.pets
  return userData
}

function generateToken (user) {
  const userData = { email: user.email, id: user._id }
  const token = jwt.sign(userData,
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  )
  return { token: token, ...userData }
}
