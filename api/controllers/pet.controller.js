const { NoteModel } = require('../models/note.model')
const { PetModel } = require('../models/pet.model')
const { CaseModel } = require('../models/case.model')
const { TestModel } = require('../models/test.model')
const { TreatmentModel } = require('../models/treatment.Model')

exports.getAllPets = (req, res) => {
  PetModel
    .find(prepareQuery(req.query))
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
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          pet = JSON.parse(JSON.stringify(pet))
          delete pet.notes
          res.status(200).json(pet)
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

exports.updatePet = async (req, res) => {
  if (req.body.notes || req.body.record) {
    res.status(409).json({ msg: 'Something in the request is not correct' })
  } else {
    const pet = preparePet(req.body)
    for (const prop in pet) {
      if (!pet[prop]) {
        delete pet[prop]
      }
    }
    try {
      const updatedPet = await PetModel.findByIdAndUpdate(req.params.petId, pet, { new: true })
      if (updatedPet) {
        res.status(200).json(updatedPet)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    }
  }
}

exports.deletePet = (req, res) => {
  PetModel
    .findByIdAndDelete(req.params.petId)
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

exports.getNotesFromPet = (req, res) => {
  PetModel
    .findById(req.params.petId)
    .populate('notes')
    .then(pet => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          let notes = pet.notes
          if (res.locals.user.role !== 'admin') {
            notes = notes.filter(note => note.public === true || note.author.toString() === res.locals.user._id.toString())
          }

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

exports.addNoteToPet = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.petId)
    const note = await NoteModel.findById(req.body.noteId)
    if (pet && note) {
      pet.notes.push(req.body.noteId)
      await pet.save()
      res.status(200).json(pet.notes)
    } else {
      res.status(404).json({ msg: 'Resource not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

exports.createNoteToPet = async (req, res) => {
  const note = prepareNote(req, res)

  try {
    const pet = await PetModel.findById(req.params.petId)
    if (pet) {
      if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
        const newNote = await NoteModel.create(note)
        pet.notes.push(newNote._id)
        await pet.save()
        res.status(201).json(newNote)
      } else {
        res.status(403).json({ msg: 'Access not allowed' })
      }
    } else {
      res.status(404).json({ msg: 'Resource not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

exports.deleteNoteFromPet = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.petId).populate('notes')
    let note
    if (pet && (note = pet.notes.find(note => note._id.toString() === req.params.noteId))) {
      if (res.locals.user.role === 'admin' || note.author.toString() === res.locals.user._id.toString()) {
        pet.notes = pet.notes.filter(note => note._id.toString() !== req.params.noteId)
        await note.remove()
        await pet.save()
        const notes = pet.notes.filter(note => note.author === res.locals.user._id.toString())
        res.status(202).json(notes)
      } else {
        res.status(403).json({ msg: 'Access not allowed' })
      }
    } else {
      res.status(404).json({ msg: 'Resource not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

exports.addCaseInPet = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.petId)
    const cases = await CaseModel.findById(req.body.caseId)
    if (pet && cases) {
      const cases = pet.record.find(c => c._id.toString() === req.body.caseId)
      if (!cases) {
        pet.record.push(req.body.caseId)
        await pet.save()
        res.status(200).json(pet)
      } else {
        res.status(409).json({ msg: 'Resource already exists' })
      }
    } else {
      res.status(404).json({ msg: 'Resource not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

exports.getVitalsPet = (req, res) => {
  PetModel
    .findById(req.params.petId)
    .populate('record')
    .then((pet) => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          const newArr = []
          pet.record.forEach((rec) => {
            if (rec.vitalSigns) {
              newArr.push(rec.vitalSigns)
            }
          })
          res.status(200).json(newArr)
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

exports.getTestsPet = (req, res) => {
  const type = req.query.type
  PetModel
    .findById(req.params.petId)
    .populate({
      path: 'record',
      populate: {
        path: 'tests',
        model: 'test'
      }
    })
    .then((pet) => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          let tests = []
          pet.record.forEach(el => tests.push(...el.tests))
          if (type) {
            tests = tests.filter(test => test.type === type)
          }
          res.status(200).json(tests)
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getAllCasePet = (req, res) => {
  PetModel
    .findById(req.params.petId)
    .populate('record')
    .then(pet => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          res.status(200).json(pet.record)
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getTreatmentsPet = (req, res) => {
  const type = req.query.type
  PetModel
    .findById(req.params.petId)
    .populate({
      path: 'record',
      populate: {
        path: 'treatments',
        model: 'treatment'
      }
    })
    .then(pet => {
      if (pet) {
        if (res.locals.user.role !== 'user' || res.locals.user.pets.includes(pet._id.toString())) {
          let treatments = []
          pet.record.forEach(elem => treatments.push(...elem.treatments))
          if (type) {
            treatments = treatments.filter(treatment => treatment.type === type)
          }

          res.status(200).json(treatments)
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.deleteCaseFromPet = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.petId).populate('record')
    const cases = pet.record.find(c => c._id.toString() === req.params.caseId)

    if (pet && cases) {
      pet.record = pet.record.filter(c => c._id.toString() !== req.params.caseId)
      await pet.save()

      await TestModel.remove({
        _id: {
          $in: cases.tests
        }
      })

      await TreatmentModel.remove({
        _id: {
          $in: cases.treatments
        }
      })

      await cases.remove()
      res.status(200).json(pet.record)
    } else {
      res.status(404).json({ msg: 'Resource not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

exports.createCaseInPet = async (req, res) => {
  const cases = req.body
  const petId = req.params.petId
  try {
    const pet = await PetModel.findById(petId).populate('record')
    if (pet) {
      const newCase = await CaseModel.create(cases)
      pet.record.push(newCase)
      await pet.save()
      res.status(200).json(newCase)
    } else {
      res.status(404).json({ msg: 'Resource does not exist' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
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

function prepareQuery(query) {
  const resultQuery = {}
  if (query.hasOwnProperty('name')) resultQuery.name = query.name

  if (query.hasOwnProperty('birthdate')) resultQuery.birthdate = query.birthdate

  if (query.hasOwnProperty('species')) resultQuery.species = query.species

  if (query.hasOwnProperty('genre')) resultQuery.genre = query.genre

  if (query.alive?.toLowerCase() === 'true') {
    resultQuery.alive = true
  } else if (query.alive?.toLowerCase() === 'false') {
    resultQuery.alive = false
  }

  return resultQuery
}

function prepareNote(req, res) {
  const note = {
    date: req.body.date,
    author: res.locals.user._id,
    text: req.body.text,
    public: req.body.public
  }
  return note
}
