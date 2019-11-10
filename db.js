const sqlite3  = require('sqlite3').verbose();
const Promise = require('bluebird')

class Dbo {
  constructor(dbPath) {
    const db = new sqlite3.Database(dbPath);
    this.db = db
  }
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        console.log(sql)
        console.log(params)
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }
  get(sql, params = []){
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, function (err, result) {
        console.log(sql)
        console.log(params)
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          return reject(err)
        } else {
          return resolve(result)
        }
      })
    })
  }
  all(sql, params=[]){
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function (err, rows) {
        console.log(sql)
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          return reject(err)
        } else {
          return resolve(rows)
        }
      })
    })
  }
}

module.exports = Dbo;
