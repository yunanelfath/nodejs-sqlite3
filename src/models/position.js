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
        tracked_at datetime
      )`
    return super.run(sql)
  }
}

module.exports = PositionRepository;
