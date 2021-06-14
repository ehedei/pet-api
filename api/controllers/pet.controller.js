const { PetModel } = require('../models/pet.model')

exports.getAllPets = (req, res) => {
  PetModel
    .find()
    .then(pets => {
      res.status(200).json(pets)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getPetById = (req, res) => {
  PetModel
    .findById(req.params.petId)
    .then(pet => {
      res.status(200).json(pet)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.savePet = (req, res) => {
  PetModel
    .create(preparePet(req.body))
    .then(pet => {
      res.status(201).json(pet)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updatePet = (req, res) => {
  if (req.body.notes || req.body.record) {
    res.status(409).json({ msg: 'Something in the request is not correct' })
  } else {
    const pet = preparePet(req.body)
    for (const prop in pet) {
      if (!pet[prop]) {
        delete pet[prop]
      }
    }

    console.log('Pet', pet)
    PetModel
      .findByIdAndUpdate(req.params.petId, pet, { new: true })
      .then(pet => {
        res.status(200).json(pet)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ msg: 'Error in Server' })
      })
  }
}

exports.deletePet = (req, res) => {
  PetModel
    .findByIdAndDelete(req.params.petId)
    .then(pet => {
      res.status(202).json(pet)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

function preparePet(body) {
  const pet = {
    name: body.name ?? this.name,
    birthdate: body.birthdate ?? this.birthdate,
    species: body.species ?? this.species,
    breed: body.breed ?? this.breed,
    genre: body.genre ?? this.genre,
    alive: body.alive ?? this.alive,
    description: body.description ?? this.description,
    alergies: body.alergies ?? this.alergies
  }

  return pet
}