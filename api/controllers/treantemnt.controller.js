const { treatmentModel } = require('../models/treanment.model')


exports.getAllTreatment = (req, res) => {
  TreatmentModel
    .find()
    .then(treatment => {
      const treatmentList = treatment.map(user => {
        return treatmentList(treatment)
      })
      res.status(200).json(treatmentList)
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
      const newtreatment = treatmentId(treatment)
      res.status(200).json(treatmentuser)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}
exports.createTreatment(req, res) {
  treatment.find(req)
    .then((treatment) => {
      treatment.push(req.body.treatment)

      treatment.save(err => {
        if (err) return err
        res.json(user)
      })
    })
    .catch((err) => res.json(err))

exports.updateTreatment(req, res) {
    treatment.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err))

exports.deleteTreatment(req, res) {
      treatment.findByIdAndDelete(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
    }