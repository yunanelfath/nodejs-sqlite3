// main.js

const Promise = require('bluebird')
const AppDBO = require('./db')
const TripRepository = require('./src/models/trip')
const PositionRepository = require('./src/models/position')
const StartServer = require('./src/server')

function main() {
  const dbo = new AppDBO('./database3.db')
  const importFile = './vehicle-trip-20190223.json'

  const tripRepo = new TripRepository(dbo)
  const positionRepo = new PositionRepository(dbo)
  const port = 3000

  const server = new StartServer(port)
  // let projectId

  tripRepo.createTable()
    .then(() => positionRepo.createTable())
    .then(() => server.start())
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

main()
