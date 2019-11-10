const path = require('path')

let config = {
  db: path.resolve(__dirname, './database1.db'),
  data: path.resolve(__dirname, './vehicle-trip-20190223.json')
}
module.exports = config
