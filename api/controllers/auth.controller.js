const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const email = req.body.email
  const pass = req.body.password

  try {
    const user = await UserModel.findOne({ email: email })
    if (user) {
      const result = await bcrypt.compare(pass, user.password)
      if (result) {
        res.status(201).json(generateToken(user))
      } else {
        res.status(401).json({ msg: 'User and password does not match' })
      }
    } else {
      res.status(401).json({ msg: 'User and password does not match' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

exports.signup = async (req, res) => {
  const userData = fillUserData(req)

  try {
    const pass = await bcrypt.hash(userData.password, 10)
    userData.password = pass
    let newUser = await UserModel.create(userData)
    newUser = JSON.parse(JSON.stringify(newUser))
    delete newUser.password
    res.status(201).json(newUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

function fillUserData(req) {
  const userData = req.body
  delete userData.role
  delete userData.pets
  return userData
}

function generateToken(user) {
  const userData = { email: user.email, id: user._id }
  const token = jwt.sign(userData,
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  )
  return { token: token, ...userData }
}
