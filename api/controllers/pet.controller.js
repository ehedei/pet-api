const { NoteModel } = require('../models/note.model')
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
      if (pet) {
        res.status(200).json(pet)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
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

    PetModel
      .findByIdAndUpdate(req.params.petId, pet, { new: true })
      .then(pet => {
        if (pet) {
          res.status(200).json(pet)
        } else {
          res.status(404).json({ msg: 'Resource not found' })
        }
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
      if (pet) {
        res.status(202).json(pet)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getNotesFromPet = (req, res) => {
  PetModel
    .findById(req.params.petId)
    .populate('notes')
    .then(pet => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          const notes = pet.notes.filter(note => note.public === true || note.author === res.locals.user._id.toString())

          res.status(200).json(notes)
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.addNoteToPet = (req, res) => {
  PetModel
    .findById(req.params.petId)
    .then(pet => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          pet.notes.push(req.body.noteId)
          pet.save()
            .then(pet => {
              res.status(200).json(pet.notes)
            })
            .catch()
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.createNoteToPet = (req, res) => {
  const note = {
    date: req.body.date,
    author: res.locals.user._id,
    text: req.body.text,
    public: req.body.public
  }

  PetModel
    .findById(req.params.petId)
    .then(pet => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          NoteModel
            .create(note)
            .then(newNote => {
              pet.notes.push(newNote._id)
              pet
                .save()
                .then(pet => res.status(201).json(newNote))
                .catch(error => {
                  console.log(error)
                  res.status(500).json({ msg: 'Error in Server' })
                })
            })
            .catch(error => {
              console.log(error)
              res.status(500).json({ msg: 'Error in Server' })
            })
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.deleteNoteFromPet = (req, res) => {
  PetModel
    .findById(req.params.petId)
    .populate('notes')
    .then(pet => {
      let note
      if (pet && (note = pet.notes.find(note => note._id.toString() === req.params.noteId))) {
        if (res.locals.user.role === 'admin' || note.author.toString() === res.locals.user._id.toString()) {
          note.remove()
          pet.save()
            .then(pet => {
              const notes = pet.notes.filter(note => note.author === res.locals.user._id.toString())
              res.status(202).json(notes)
            })
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
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
