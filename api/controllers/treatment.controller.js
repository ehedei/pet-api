const { TreatmentModel } = require('../models/treatment.Model.js')

exports.getAllTreatments = (req, res) => {
  TreatmentModel
    .find()
    .then(treatments => {
      res.status(200).json(treatments)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getTreatmentById = (req, res) => {
  TreatmentModel
    .findById(req.params.treatmentId)
    .then(treatment => {
      res.status(200).json(treatment)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.createTreatment = (req, res) => {
  TreatmentModel
    .create(req.body)
    .then((treatment) => {
      res.status(201).json(treatment)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updateTreatment = (req, res) => {
  console.log(req.params.treatmentId)
  TreatmentModel
    .findByIdAndUpdate(req.params.treatmentId, req.body, { new: true})
    .then((result) => res.status(200).json(result))
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.deleteTreatment = (req, res) => {
  TreatmentModel
    .findByIdAndDelete(req.params.treatmentId,)
    .then((result) => res.status(200).json(result))
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}
