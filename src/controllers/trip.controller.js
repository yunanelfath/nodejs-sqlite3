const fs = require('fs');
const TripRepository = require('../models/trip')
const tripModel = new TripRepository()

let controller = {
  dumpRecord: function(importFile){
    console.log(importFile)

    var obj = JSON.parse(fs.readFileSync(importFile, 'utf8'));

    let values = []
    console.log(obj.trips.length)
    let fields = [
      'id','start','end','distance','duration','max_speed','average_speed','idle_duration','score'
    ];
    for(let i=0;i<obj.trips.length;i++){
      // debugger
      let value = obj.trips[i]
      values[i] = []
      for(let a=0;a<fields.length;a++){
        if(['start','end'].includes(fields[a])){
          values[i].push(`'${value[fields[a]]['tracked_at']}'`)
        }else{
          values[i].push(`'${value[fields[a]]}'`)
        }
      }

    }
    // console.log(values.join('),('))
    values = `(${values.join('),(')})`
    // console.log(values)
    tripModel.create({fields, values})
    return values
  },
  get: async function(){
    let data = await tripModel.all()
    console.log(data)
    return data
  },
  hello: async function(req, res){
    return res.send('hello world')
  }
}
module.exports = controller
