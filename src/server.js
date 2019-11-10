const express = require('express');
const tripController = require('./controllers/trip.controller')

class StartServer{
  constructor(port){
    this.port = port
  }

  start(){
    const app = express();

    // app.get('/', (req, res) => res.send('Hello world'))
    app.get('/', tripController.getListTrip)
    app.get('/export', tripController.hello)

    app.listen(this.port, err => {
      if (err) {
        process.exit(1);
        return;
      }
      console.log("Port opened at " + this.port);
    });
  }
}

module.exports = StartServer
