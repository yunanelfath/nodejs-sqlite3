// position_repository.js
const AppDBO = require('../../db')
const config = require('../../config')

class PositionRepository extends AppDBO  {
  constructor(db=config.db) {
    super(db)
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS positions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER,
        name TEXT,
        latitude varchar(255),
        longitude varchar(255),
        speed varchar(255),
        voltage varchar(255),
        distance varchar(255),
        tracked_at datetime
      )`
    return super.run(sql)
  }

  create(obj) {
    const { fields, values } = obj

    return super.run(
      `INSERT INTO positions (${fields}) VALUES ${values}`)
  }
  get(id){
    return super.get(`select * from positions where id = ?`,[id])
  }
  getByTrip(id){
    return super.all(`select id as ID, tracked_at as Datetime, latitude as Latitude, longitude as Longitude, speed as 'Speed(kmh)', distance as 'Distance(m)', voltage as Voltage from positions where trip_id = ?`,[id])
  }
  all(){
    return super.all(`select * from positions order by id desc`)
  }
}

module.exports = PositionRepository;
