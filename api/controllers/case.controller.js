const { CaseModel } = require('../models/case.model')

exports.getAllCases = (req, res) => {
  CaseModel
    .find()
    .then((cases) => {
      if (cases) {
        res.status(200).json(cases)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.createCase = (req, res) => {
  CaseModel
    .create(req.body)
    .then((cases) => {
      if (cases) {
        res.status(200).json(cases)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getCasebyId = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .then((cases) => {
      if (cases) {
        res.status(200).json(cases)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.deleteCase = (req, res) => {
  CaseModel
    .findByIdAndDelete(req.params.caseId)
    .then((cases) => {
      if (cases) {
        res.status(200).json(cases)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updateCase = (req, res) => {
  CaseModel
    .findByIdAndUpdate(req.params.caseId, req.body, { new: true })
    .then((cases) => {
      if (cases) {
        res.status(200).json(cases)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getAllTestInCase = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .populate('tests')
    .then((cases) => {
      if (cases) {
        res.status(200).json(cases.tests)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.addTestInCase = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .then((cases) => {
      if (cases) {
        const tests = cases.tests.find(t => t._id.toString() === req.body.testId)
        if (!tests) {
          cases.tests.push(req.body.testId)
          cases.save(function (err) {
            if (err) {
              res.status(500).json({ msg: 'Error in Server' })
            } else {
              res.status(200).json(cases)
            }
          })
        } else {
          res.status(409).json({ msg: 'Resource already exists' })
        }
      } else {
        res.status(409).json({ msg: 'Resource already exists' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.addTreatmentsInCase = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .then((cases) => {
      if (cases) {
        const treatment = cases.treatments.find(treatment => treatment._id.toString() === req.body.treatmentId)
        if (!treatment) {
          cases.treatments.push(req.body.treatmentId)
          cases.save(function (err) {
            if (err) {
              res.status(500).json({ msg: 'Error in Server' })
            } else {
              res.status(200).json(cases)
            }
          })
        } else {
          res.status(409).json({ msg: 'Resource already exists' })
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

exports.getTreatmentsInCase = (req, res) => {
  CaseModel
    .findById(req.params.caseId)
    .populate('treatments')
    .then((cases) => {
      if (cases) {
        res.status(200).json(cases.treatments)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}