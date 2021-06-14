const jwt = require('jsonwebtoken')
const { UserModel } = require('../api/models/user.model')

exports.checkAuth = (req, res, next) => {
  console.log(req.headers.token)
  jwt.verify(req.headers.token, process.env.TOKEN_SECRET, (err, token) => {
    if (err) {
      res.status(403).json({ msg: 'Token not valid' })
    } else {
      UserModel
        .findById(token.id)
        .then(user => {
          if (user) {
            res.locals.user = user
            next()
          } else {
            res.status(403).json({ msg: 'Token not valid' })
          }
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({ msg: 'Error in Server' })
        })
    }
  })
}

exports.checkAdmin = (req, res, next) => {
  const user = res.locals.user
  if (user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ msg: 'Access not allowed' })
  }
}

exports.checkAdminOrVet = (req, res, next) => {
  const user = res.locals.user
  if (user.role === 'admin' || user.role === 'vet') {
    next()
  } else {
    res.status(403).json({ msg: 'Access not allowed' })
  }
}
