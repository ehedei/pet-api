const { CaseModel } = require('../models/case.model')

exports.getAllCases = (req, res) => {
  CaseModel
    .find()
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.createCase = (req, res) => {
  CaseModel
    .create(req.body)
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getCasebyId = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.deleteCase = (req, res) => {
  CaseModel
    .findByIdAndDelete(req.params.caseId)
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updateCase = (req, res) => {
  CaseModel
    .findByIdAndUpdate(req.params.caseId, req.body)
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getAllTestInCase = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .populate('tests')
    .then((cases) => {
      res.status(200).json(cases.tests)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.addTestInCase = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .then((cases) => {
      cases.tests.push(req.body.id)
      cases.save(function (err) {
        if (err) return err
        res.json(cases)
      })
      res.status(200).json(cases)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}