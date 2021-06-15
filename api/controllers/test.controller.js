const { TestModel } = require('../models/test.model')

exports.getAllTests = (req, res) => {
  TestModel
    .find()
    .then((tests) => {
      res.status(200).json(tests)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}


exports.getTestById = (req, res) => {
  TestModel
    .findById(req.params.testId)
    .then((test) => {
      res.status(200).json(test)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.createTest = (req, res) => {
  TestModel
    .create(req.body)
    .then((test) => {
      res.status(200).json(test)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updateTestById = (req, res) => {
  TestModel
    .findByIdAndUpdate(req.params.testId, req.body, { new: true }) 
    .then((test) => {
      res.status(200).json(test)
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.deleteTestById = (req, res) => {
  TestModel
    .findByIdAndDelete(req.params.testId)
    .then((test) => {
      res.status(200).json(test)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}