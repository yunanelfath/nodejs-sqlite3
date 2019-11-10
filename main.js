// main.js

const Promise = require('bluebird')
const AppDBO = require('./db')
const TripRepository = require('./src/models/trip')
const TripController = require('./src/controllers/trip.controller')
const PositionRepository = require('./src/models/position')
const StartServer = require('./src/server')
const path = require('path')
const config = require('./config')
const opn = require('opn')

function main() {

  const tripRepo = new TripRepository()
  const positionRepo = new PositionRepository()
  const port = 3000

  const server = new StartServer(port)

  tripRepo.createTable()
    .then(() => positionRepo.createTable())
    .then(() => TripController.dumpRecord(config.data))
    .then(() => TripController.get())
    .then(() => server.start())
    .then(() => opn(`http://localhost:${port}`))
    .catch((err) => {
      console.log('Error: ')
      console.log(err)
    })
}

main()
