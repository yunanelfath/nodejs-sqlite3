const fs = require('fs');
const TripRepository = require('../models/trip')
const PositionRepository = require('../models/position')
const tripModel = new TripRepository()
const positionModel = new PositionRepository()
const { ExportToCsv } = require('export-to-csv')

let controller = {
  dumpRecord: function(importFile){
    console.log(importFile)

    var obj = JSON.parse(fs.readFileSync(importFile, 'utf8'));

    let values = []
    let position_values = []
    let position_creates = []
    console.log(obj.trips.length)
    let fields = [
      'id','start','end','distance','duration','max_speed','average_speed','idle_duration','score'
    ];
    let position_fields = [
      'latitude','longitude','speed','voltage','distance','tracked_at','trip_id'
    ]
    let position_values_join = []
    for(let i=0;i<obj.trips.length;i++){

      let value = obj.trips[i]

      // build position object values
      for(c=0;c<value.histories.length;c++){

        let value_history = value.histories[c]
        position_values[c] = []
        for(let b=0;b<position_fields.length;b++){
          let position_push = position_fields[b] !== 'trip_id' ? `'${value_history[position_fields[b]]}'` : `'${value.id}'`
          position_values[c].push(position_push)
        }
      }
      position_values_join.push(`(${position_values.join('),(')})`)

      // build trips object values
      values[i] = []
      for(let a=0;a<fields.length;a++){
        if(['start','end'].includes(fields[a])){
          values[i].push(`'${value[fields[a]]['tracked_at']}'`)
        }else{
          values[i].push(`'${value[fields[a]]}'`)
        }
      }

    }

    values = `(${values.join('),(')})`
    position_values_join = position_values_join.join(',')

    tripModel.create({fields, values})
    positionModel.create({fields: position_fields, values: position_values_join})
    return values
  },
  get: async function(){
    let data = await tripModel.all()
    return data
  },
  getListTrip: async function(req, res){
    let data = await tripModel.all()
    let table = '<table> \
      <thead> \
        <th>Start Datetime</th><th>End Datetime</th><th>Locations</th><th>Action</th>\
      </thead>\
      <tbody>'
      for(let i=0;i<data.length;i++){
        table += `<tr>\
        <td>${data[i].start}</td><td>${data[i].end}</td><td>${data[i].average_speed}</td>\
        <td><a href="/export/${data[i].id}">export to csv</a></td>\
        </tr>`
      }
      table += '</tbody>\
    </table>'
    let header = ''
    let body = table
    let html = '<!DOCTYPE html>'
       + '<html><head>' + header + '</head><body>' + body + '</body></html>';

    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      'Expires': new Date().toUTCString()
    });
    res.end(html);
  },
  export: async function(req, res){
    let data = await positionModel.getByTrip(req.params.id)
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'My Awesome CSV',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };

    const csvExporter = new ExportToCsv(options);

    console.log(data)
    try{
      // csvExporter.generateCsv(data);

      const csvData = csvExporter.generateCsv(data, true)
      return fs.writeFileSync('data.csv',csvData)
    }catch(e){
      console.log(e)
    }
  },
  hello: async function(req, res){
    return res.send('hello world')
  }
}
module.exports = controller
