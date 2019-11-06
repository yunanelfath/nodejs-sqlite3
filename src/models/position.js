// position_repository.js

class PositionRepository {
  constructor(dao) {
    this.dao = dao
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
    return this.dao.run(sql)
  }
}

module.exports = PositionRepository;
