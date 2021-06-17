const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const { PetModel } = require('../models/pet.model')

exports.getAllUsers = (req, res) => {
  UserModel
    .find(prepareQuery(req.query))
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
      res.status(200).json(newUser)
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

exports.createPetIntoUser = async (req, res) => {
  const user = res.locals.user
  const pet = req.body
  if (pet.notes || pet.cases) {
    res.status(409).json({ msg: 'There is something wrong in the request' })
  } else {
    try {
      const newPet = await PetModel.create(pet)
      user.pets.push(newPet)
      await user.save()
      res.status(201).json(newPet)
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    }
  }
}

async function prepareUserUpdates(req, res) {
  try {
    const user = await UserModel.findById(req.params.userId)
    if (user) {
      const updates = req.body

      setUpdatesInUser(user, updates)

      await user.save()
      const newUser = duplicateUserWithoutPass(user)
      res.status(200).json(newUser)
    } else {
      res.status(404).json({ msg: 'Resource not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
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

exports.addPetInUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    const pet = await PetModel.findById(req.body.petId)
    if (user && pet) {
      const pets = user.pets.find(p => p._id.toString() === req.body.petId)
      if (!pets) {
        user.pets.push(req.body.petId)
        await user.save()
        res.status(200).json(duplicateUserWithoutPass(user))
      } else {
        res.status(409).json({ msg: 'Resource already exists' })
      }
    } else {
      res.status(404).json({ msg: 'Resource does not exist' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

function prepareQuery(query) {
  const resultQuery = {}
  if (query.hasOwnProperty('username')) resultQuery.username = query.username

  if (query.hasOwnProperty('email')) resultQuery.email = query.email

  if (query.hasOwnProperty('firstname')) resultQuery.firstName = query.firstName

  if (query.hasOwnProperty('lastname')) resultQuery.lastName = query.lastName

  if (query.hasOwnProperty('phone')) resultQuery.phone = query.phone

  if (query.hasOwnProperty('mobile')) resultQuery.mobile = query.mobile

  if (query.hasOwnProperty('role')) resultQuery.role = query.role

  return resultQuery
}
