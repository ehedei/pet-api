const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const { PetModel } = require('../models/pet.model')

exports.getAllUsers = (req, res) => {
  UserModel
    .find()
    .then(users => {
      const userList = users.map(user => {
        return duplicateUserWithoutPass(user)
      })
      res.status(200).json(userList)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getUserById = (req, res) => {
  UserModel
    .findById(req.params.userId)
    .then(user => {
      const newUser = duplicateUserWithoutPass(user)
      res.status(200).json(newUser)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getUserProfile = (req, res) => {
  UserModel
    .findById(res.locals.user._id.toString())
    .populate('pets')
    .then(user => {
      const newUser = duplicateUserWithoutPass(user)
      res.status(200).json(newUser)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updateUser = (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10)
      .then(pass => {
        req.body.password = pass
        prepareUserUpdates(req, res)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ msg: 'Error in Server' })
      })
  } else {
    prepareUserUpdates(req, res)
  }
}

exports.deleteUser = (req, res) => {
  UserModel
    .findByIdAndDelete(req.params.userId)
    .then(user => {
      const newUser = duplicateUserWithoutPass(user)
      res.status(202).json(newUser)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updateProfile = (req, res) => {
  if (req.body.role || req.body.pets) {
    res.status(403).json({ msg: 'Access not allowed' })
  } else {
    if (req.body.password) {
      bcrypt.hash(req.body.password, 10)
        .then(pass => {
          req.body.password = pass
          makeUpdateProfile(req, res)
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({ msg: 'Error in Server' })
        })
    } else {
      makeUpdateProfile(req, res)
    }
  }
}

exports.addPetToUser = (req, res) => {
  const user = res.locals.user
  const pet = req.body
  if (pet.notes || pet.cases) {
    res.status(409).json({ msg: 'There is something wrong in the request' })
  } else {
    PetModel
      .create(pet)
      .then(newPet => {
        user.pets.push(newPet)
        user
          .save()
          .then(user => res.status(201).json(newPet))
          .catch(error => {
            console.log(error)
            res.status(500).json({ msg: 'Error in Server' })
          })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ msg: 'Error in Server' })
      })
  }
}

function makeUpdateProfile(req, res) {
  const user = res.locals.user
  setUpdatesInUser(user, req.body)
  user
    .save()
    .then(user => {
      const newUser = duplicateUserWithoutPass(user)
      res.status(200).json(newUser)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

function prepareUserUpdates(req, res) {
  UserModel
    .findById(req.params.userId)
    .then(user => {
      const updates = req.body

      setUpdatesInUser(user, updates)

      user
        .save()
        .then(user => {
          const newUser = duplicateUserWithoutPass(user)
          res.status(200).json(newUser)
        })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

function setUpdatesInUser(user, updates) {
  for (const property in updates) {
    if (typeof updates[property] === 'object') {
      setUpdatesInUser(user[property], updates[property])
    } else {
      user[property] = updates[property] ?? user[property]
    }
  }
}

function duplicateUserWithoutPass(user) {
  const newUser = JSON.parse(JSON.stringify(user))
  delete newUser.password
  return newUser
}

