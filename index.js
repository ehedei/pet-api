process.stdout.write('\x1Bc')

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const { router } = require('./api/routes')

mongoose.connect(
  process.env.MONGO_URL || 'mongodb://localhost:27017/',
  {
    dbName: process.env.MONGO_DB || 'pet-api',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) {
      console.log(`DB Error: ${err}`)
    } else {
      console.log('Connected to MongoDB')
      app
        .use(morgan('dev'))
        .use(cors())
        .use(express.json())
        .use('/api', router)
        .listen(process.env.PORT, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.info('\n\n' + '='.repeat(40))
            console.info('💻  VetAPI')
            console.info(`📡  PORT: ${process.env.URL}:${process.env.PORT}`)
            console.info('='.repeat(40) + '\n\n')
          }
        })
    }
  }
)
