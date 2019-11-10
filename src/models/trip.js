// trip.js
const AppDBO = require('../../db')
const config = require('../../config')

class TripRepository extends AppDBO {
  constructor(db=config.db) {
    super(db)
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      start DATETIME,
      end DATETIME,
      distance INTEGER,
      duration INTEGER,
      max_speed FLOAT,
      average_speed FLOAT,
      idle_duration INTEGER,
      score INTEGER
    )`
    return super.run(sql)
  }

  create(obj) {
    const { fields, values } = obj

    return super.run(
      `INSERT INTO trips (${fields}) VALUES ${values}`)
  }
  get(id){
    return super.get(`select * from trips where id = ?`,[id])
  }
  all(){
    return super.all(`select * from trips order by id desc`)
  }
}

module.exports = TripRepository;
