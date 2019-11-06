// project_repository.js

class ProjectRepository {
  constructor(dao) {
    this.dao = dao
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
    return this.dao.run(sql)
  }
}

module.exports = ProjectRepository;
